import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";

const port = 4000;
const app = express();
app.use(cors());
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/notes", async (req, res) => {
    const result = await db.query("SELECT * FROM notes");
    res.json(result.rows);
})

app.post("/notes", async (req, res) => {
    const {title, content} = req.body;
    const result = await db.query("INSERT INTO notes (title, content)\
        VALUES ($1, $2) RETURNING *", [title, content]);
    res.json(result.rows);
})

app.patch("/notes/:id", async (req, res) => {
    const {title, content} = req.body;
    const result = await db.query("UPDATE notes SET title = $1, content = $2\
        WHERE id = $3 RETURNING *", [title, content, req.params.id]);
    res.json(result.rows);
})

app.delete("/notes/:id", async (req, res) => {
    const {id} = req.params;
    const result = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);
    res.json(result.rows);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});