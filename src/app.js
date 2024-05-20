import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";

// router
import indexRouter from "./routes/index/index.router.js";
import openaiRouter from "./routes/openai/openai.router.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolder = path.resolve(__dirname, '../public');
const viewsFolder = path.resolve(__dirname, './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticFolder));
app.set('view engine', 'ejs');
app.set('views', viewsFolder);

// Routes
app.use("/", indexRouter);
app.use("/openai", openaiRouter);

export default app;
