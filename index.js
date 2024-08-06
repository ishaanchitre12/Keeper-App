const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
// process.env.PORT
// process.env.NODE_ENV => production or undefined
if (process.env.NODE_ENV === "production") {
    // server static content
    // npm run build
    
}

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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});