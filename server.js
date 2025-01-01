import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import trendsRouter from './routes/trends.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/api', trendsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});