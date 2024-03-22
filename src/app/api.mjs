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
    let query = `SELECT 
    items.name AS name,
    GROUP_CONCAT(DISTINCT items.level) AS level,
    GROUP_CONCAT(DISTINCT items.description) AS description,
    GROUP_CONCAT(DISTINCT items.apCost) AS apCost,
    GROUP_CONCAT(DISTINCT items.maxRange) AS maxRange,
    GROUP_CONCAT(DISTINCT items.minRange) AS minRange,
    GROUP_CONCAT(DISTINCT items.nmbCast) AS nmbCast,
    GROUP_CONCAT(DISTINCT items.criticalHitProbability) AS criticalHitProbability,
    GROUP_CONCAT(DISTINCT items.img) AS img,
    GROUP_CONCAT(DISTINCT items.imgHighRes) AS imgHighRes,
    GROUP_CONCAT(DISTINCT items.type) AS type,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'from', items.weaponDmgFrom,
            'to', items.weaponDmgTo,
            'name', characteristics.name,
            'img', characteristics.img_url
        )
    ) AS characs
FROM 
    items 
JOIN 
    characteristics ON items.weaponDmgCharacteristic = characteristics.characteristic_id 
GROUP BY
    items.name
`;

    const queryParams = [];
    const conditions = [];

    if (req.query.name) {
        const nameFilter = `%${req.query.name}%`;
        queryParams.push(nameFilter);
        conditions.push(`items.name LIKE ?`);
    }

    if (req.query.effects) {
        const effectsFilter = `%${req.query.effects}%`;
        queryParams.push(effectsFilter);
        conditions.push(`effects LIKE ?`);
    }

    if (req.query.id) {
        const itemIdFilter = req.query.id;
        queryParams.push(itemIdFilter);
        conditions.push(`itemId LIKE ?`);
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
