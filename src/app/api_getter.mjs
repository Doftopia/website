import axios from "axios";
import mysql from "mysql2/promise"; 

const dbConfig = {
    host: 'localhost',
    user: 'doftopia',
    password: '1234',
    database: 'doftopia'
};

async function fetchItemsAndInsertIntoDB(limit, pool) {
    try {
        while (true) {
            const responseItems = await axios.get(`https://api.dofusdb.fr/items?$limit=${limit}&$skip=${limit}`);
            limit += 50;
            const items = responseItems.data.data;

            if (items.length === 0) {
                console.log("No more items to fetch.");
                break;
            }

            for (const item of items) {
                try {
                    const insertItemQuery = "INSERT INTO items (name, description, type, level, img) VALUES (?, ?, ?, ?, ?)";
                    const insertItemParams = [item.name.fr, item.description.fr, item.type.name.fr, item.level, item.imgset[1].url];
                    await pool.execute(insertItemQuery, insertItemParams);

                    const itemId = (await pool.query("SELECT LAST_INSERT_ID() as id"))[0][0].id;

                    for (const effect of item.effects) {
                        const insertEffectQuery = "INSERT INTO effects (item_id, characteristic, `from`, `to`) VALUES (?, ?, ?, ?)";
                        const insertEffectParams = [itemId, effect.characteristic, effect.from, effect.to];
                        await pool.execute(insertEffectQuery, insertEffectParams);
                    }
                } catch (error) {
                    console.error("Error inserting item:", error);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

async function main() {
    const pool = await mysql.createPool(dbConfig);
    try {
        await fetchItemsAndInsertIntoDB(50, pool);
    } finally {
        await pool.end(); // Close the connection pool when done
    }
}

main();

// mysql> CREATE TABLE IF NOT EXISTS doftopia.items (
//     ->     id INT AUTO_INCREMENT PRIMARY KEY,
//     ->     name VARCHAR(255),
//     ->     description TEXT,
//     ->     type VARCHAR(50),
//     ->     level INT,
//     ->     img VARCHAR(255)
//     -> );

// mysql> CREATE TABLE IF NOT EXISTS doftopia.effects (
//     ->     id INT AUTO_INCREMENT PRIMARY KEY,
//     ->     item_id INT,
//     ->     characteristic VARCHAR(255),
//     ->     `from` INT,
//     ->     `to` INT
//     -> );

