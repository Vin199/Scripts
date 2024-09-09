import express from 'express';
import router from './routes/route.js';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '100mb', extended: true }));
app.set('views', path.join(__dirname, '/pages'));
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname, '/public')));

app.use('', router);

app.listen(PORT, () => {
    console.log(`⚡️Server is up and running locally on http://localhost:${PORT}`);
});