import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
    cors()
);

const dbConfig = {
    host: 'localhost',
    user: 'doftopia',
    password: '1234',
    database: 'doftopia'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connected to db");
})

app.get("/items", (req, res) => {
    let query = `SELECT * FROM items`;

    const queryParams = [];
    const conditions = [];

    if (req.query.name) {
        const nameFilter = `%${req.query.name}%`;
        queryParams.push(nameFilter);
        conditions.push(`name LIKE ?`);
    }

    if (req.query.effects) {
        const effectsFilter = `%${req.query.effects}%`;
        queryParams.push(effectsFilter);
        conditions.push(`effects LIKE ?`);
    }

    if (req.query.id) {
        const itemIdFilter = req.query.id;
        queryParams.push(itemIdFilter);
        conditions.push(`itemId = ?`);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (req.query.limit) {
        query += ` LIMIT ?`;
        queryParams.push(parseInt(req.query.limit));
    }

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json({ data: results });
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
