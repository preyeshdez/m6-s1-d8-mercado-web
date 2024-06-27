import express from 'express';
import { create } from 'express-handlebars';
import productos from './productos.js';

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use('/bootstrap', express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
})

const hbs = create({
	partialsDir: [
		path.join(__dirname, "/views/partials/"),
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", (req, res) => {
	res.render("home", {
		productos
	})
})