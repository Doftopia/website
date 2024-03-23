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
        const effects = Array.isArray(req.query.effect) ? req.query.effect : [req.query.effect];
        effects.forEach(effect => {
            if (queryParams.length > 0) {
                itemQuery += ` AND`;
            } else {
                itemQuery += ` WHERE`;
            }
            itemQuery += `
            items.name IN (
                SELECT DISTINCT
                    items.name
                FROM
                    items
                LEFT JOIN
                    characteristics ON items.itemCharacteristics = characteristics.characteristic_id
                WHERE
                    characteristics.characteristic_id LIKE ?
                    AND items.weaponDmgFrom > 0
            )`;
            queryParams.push(effect);
        });
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
                try {
                    let existingItem = groupedData.find(item => item.itemName === result.itemName);
                    if (!existingItem) {
                        existingItem = { itemName: result.itemName, itemId: result.itemId, description: result.description, level: result.level, type: result.type, img: result.img, imgHighRes: result.imgHighRes, apCost: result.apCost, minRange: result.minRange, maxRange: result.maxRange, nmbCast: result.nmbCast, criticalHitProbability: result.criticalHitProbability, characteristics: [] };
                        groupedData.push(existingItem);
                    }
                    existingItem.characteristics.push({ characName: result.characName, characFrom: result.characFrom, characTo: result.characTo, characImg: result.characImg, characId: result.characId });
                } catch (error) {
                    console.error(error)
                }
            });
            res.json({ limit: parseInt(baselimit), total: results.length, data: groupedData });
        }
    });
});

app.get('/recipes', (req, res) => {
    let itemQuery = `SELECT 
        recipes.resultId,
        recipes.quantities,
        recipes.ids,
        recipes.jobId,
        GROUP_CONCAT(items.name) AS itemName,
        GROUP_CONCAT(items.img) AS itemImg,
        GROUP_CONCAT(items.level) AS itemLevel,
        items.id AS itemId 
    FROM 
        recipes 
    LEFT JOIN 
        items ON items.id = recipes.ids`

    const queryParams = [];

    if (req.query.resultId) {
        itemQuery += ` WHERE recipes.resultId = ? `
        queryParams.push(req.query.resultId);
    }

    itemQuery += ` GROUP BY 
    recipes.resultId, 
    recipes.quantities, 
    recipes.ids, 
    recipes.jobId`

    let groupedData = [];
    let subData = []
    let previousItemId;
    connection.query(itemQuery, queryParams, (error, results) => {
        if (results.length > 0) {
            previousItemId = results[0].resultId;
        }

        if (error) {
            console.error(`Error fetching recipes: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        } else {
            results.forEach(result => {
                try {
                    if (previousItemId != result.resultId) {
                        groupedData.push({resultItemId: previousItemId, jobId: result.jobId, itemLevel: result.itemLevel, recipe: subData});
                        previousItemId = result.resultId;
                        subData = [];
                    } 
                    subData.push({quantity: result.quantities, itemName: result.itemName, itemId: result.ids, itemImg: result.itemImg});
                } catch (error) {
                    console.error(error);
                }
            });
            try {
                groupedData.push({resultItemId: previousItemId, jobId: results[results.length-1].jobId, itemLevel: results[results.length-1].itemLevel, recipe: subData});
            } catch (error) {
                console.log(`trying to access an item without characs: ${error}`);
            }
            res.json({data: groupedData});
        }
    })
});

app.get('/jobs', (req, res) => {
    let itemQuery = `SELECT * from jobs`
    const queryParams = [];

    if (req.query.id) {
        itemQuery += ` WHERE jobs.jobId = ?`;
        queryParams.push(parseInt(req.query.id));
    }

    connection.query(itemQuery, queryParams, (error, results) => {
        if (error) {
            console.error(`Error fetching jobs: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        } else {
            res.json({data: results})
        }
    })
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
