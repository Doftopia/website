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
    let itemQuery = `SELECT items.name AS itemName, characteristics.name AS characName, items.id as itemId, characteristics.img_url as characImg, items.description, items.level, items.type, items.img, items.imgHighRes, items.apCost, items.maxRange, items.minRange, items.nmbCast, items.criticalHitProbability, items.weaponDmgFrom as characFrom, items.weaponDmgTo as characTo, items.itemCharacteristics as characId FROM items LEFT JOIN characteristics ON items.itemCharacteristics = characteristics.characteristic_id`;
    let baselimit = 30;
    
    const queryParams = [];
    
    if (req.query.id) {
        itemQuery += ` WHERE id = ?`;
        queryParams.push(parseInt(req.query.id));
    }
    
    if (req.query.name) {
        itemQuery += ` WHERE items.name LIKE ?`;
        queryParams.push(`%${req.query.name}%`);
    }

    if (req.query.effect) {
        if (queryParams.length > 0) {
            itemQuery += ` AND`;
        } else {
            itemQuery += ` WHERE`;
        }
        itemQuery += ` items.name IN (
            SELECT DISTINCT
                items.name
            FROM
                items
            LEFT JOIN
                characteristics ON items.itemCharacteristics = characteristics.characteristic_id
            WHERE
                characteristics.name LIKE ?
                AND items.weaponDmgFrom > 0
        )`;
        queryParams.push(req.query.effect);
    }
    

    if (req.query.limit) {
        baselimit = req.query.limit;
    }

    itemQuery += ` LIMIT ${baselimit}`;

    let groupedData = [];
    connection.query(itemQuery, queryParams, (error, results) => {
        if (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        } else {
            results.forEach(result => {
                let existingItem = groupedData.find(item => item.itemName === result.itemName);
                if (!existingItem) {
                    existingItem = { itemName: result.itemName, itemId: result.itemId, description: result.description, level: result.level, type: result.type, img: result.img, imgHighRes: result.imgHighRes, apCost: result.apCost, minRange: result.minRange, maxRange: result.maxRange, nmbCast: result.nmbCast, criticalHitProbability: result.criticalHitProbability, characteristics: [] };
                    groupedData.push(existingItem);
                }
                existingItem.characteristics.push({ characName: result.characName, characFrom: result.characFrom, characTo: result.characTo, characImg: result.characImg, characId: result.characId });
            });
            res.json({ limit: parseInt(baselimit), total: results.length, data: groupedData });
        }
    });
});



app.get("/characteristics", (req, res) => {
    let baselimit = 10;
    let itemQuery = `select * from characteristics`;

    const queryParams = [];

    if (req.query.id) {
        query += `WHERE id = ?`;
        queryParams.push(parseInt(req.query.id));
    }

    if (req.query.name) {
        query += `WHERE name like ?`;
        queryParams.push(`%${req.query.name}%`);
    }

    if (req.query.limit) {
        baselimit = req.query.limit
    }

    itemQuery += ` limit ${baselimit}`


    connection.query(itemQuery, queryParams, (error, results) => {
        if (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json({ limit: parseInt(baselimit), total: results.length, data: results });
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
