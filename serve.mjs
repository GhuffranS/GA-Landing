import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const headers = { 'Content-Type': contentType };

    // Cache headers mirror vercel.json: long-lived immutable for static assets,
    // revalidate for the HTML document.
    const STATIC = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2'];
    if (STATIC.includes(ext)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    } else if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache';
    }

    // gzip text responses (Vercel serves these compressed in production).
    const COMPRESSIBLE = ['.html', '.css', '.js', '.mjs', '.json', '.svg'];
    const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    if (acceptsGzip && COMPRESSIBLE.includes(ext)) {
      zlib.gzip(data, (gzErr, gzipped) => {
        if (gzErr) {
          res.writeHead(200, headers);
          res.end(data);
          return;
        }
        headers['Content-Encoding'] = 'gzip';
        headers['Vary'] = 'Accept-Encoding';
        res.writeHead(200, headers);
        res.end(gzipped);
      });
      return;
    }

    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
