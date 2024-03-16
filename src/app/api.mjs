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
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get("/items", (req, res) => {
    let query = `SELECT * FROM items`;

    if (req.query.name) {
        const nameFilter = mysql.escape(`%${req.query.name}%`);
        query += ` WHERE name LIKE ${nameFilter}`;
    } else if (req.query.effects) {
        const nameFilter = mysql.escape(`%${req.query.effects}%`);
        query += ` WHERE items.effects LIKE ${nameFilter}`;
    }

    connection.query(query, (error, results) => {
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
