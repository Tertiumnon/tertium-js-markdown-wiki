import fs from 'node:fs';
import express from 'express';
import { getFiles } from './utils/file.util';

const app = express();

const APP_PORT = 8080; // Default port to listen
const TEST_DIR = 'test';

// Configure Express to use EJS
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define a route handler for the default home page
app.get('/', (_req, res) => {
  res.send('Bun Markdown Wiki');
});

app.get('/test', (_req, res) => {
  const path = `${__dirname}/../${TEST_DIR}/test.md`;
  const file = fs.readFileSync(path, 'utf8');
  res.send(Bun.markdown.html(file, { autolinks: true }));
});

app.get('/files', (_req, res) => {
  res.json({ data: getFiles(TEST_DIR) });
});

// Start the express server
app.listen(APP_PORT, () => {
  // Tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${APP_PORT}`);
});
