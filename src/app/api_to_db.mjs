import axios from "axios";
import { response } from "express";
import mysql from "mysql2/promise"; 

let characName = "";
let characImg = "";

const dbConfig = {
    host: 'localhost',
    user: 'doftopia',
    password: '1234',
    database: 'doftopia'
};

async function fetchItemsAndInsertIntoDB(pool) {
    let skip = 0;
    try {
        while (true) {
            const responseItems = await axios.get(`https://api.beta.dofusdb.fr/items?$limit=50&$skip=${skip}`);
            skip += 50;
            const items = responseItems.data.data;

            if (items.length === 0) {
                console.log("No more items to fetch.");
                break;
            }

            for (const item of items) {
                try {
                    const insertItemQuery = "INSERT INTO items (name, description, type, level, img, puuid, itemId, effects) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    for (let i = 0; i < item.effects.length; i++) {
                        try {
                            // HORRIBLEMENT OPTI J'AI FAIT AUCUN EFFORT NE L'UTILISE PAS TROP AVANT QUE JE LE CHANGE
                            const responseCharacteristics = await axios.get(`https://api.beta.dofusdb.fr/characteristics?id=${item.effects[i].characteristic}`);
                            characName = responseCharacteristics.data.data[0].name.fr
                            characImg = responseCharacteristics.data.data[0].asset
                        } catch (error) {
                        }
                        item.effects[i]['characName'] = characName;
                        item.effects[i]['characImg'] = `https://beta.dofusdb.fr/icons/characteristics/${characImg}.png`;
                    }
                    const effects = JSON.stringify(item.effects);
                    const insertItemParams = [item.name.fr, item.description.fr, item.type.name.fr, item.level, item.imgset[1].url, item._id, item.id, effects];
                    await pool.execute(insertItemQuery, insertItemParams);
                } catch (error) {
                    console.error("Error inserting item:", error);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}



async function fetchCharacteristicsAndInsertIntoDB(pool) {
    let skip = 0;
    try {
        while (true) {
            const responseCharacteristics = await axios.get(`https://api.beta.dofusdb.fr/characteristics?$limit=50&$skip=${skip}`);
            skip+=50;
            const characteristics = responseCharacteristics.data.data;

            if (characteristics.length === 0) {
                console.log("No more characteristics to fetch.");
                break;
            }

            for (const characteristic of characteristics) {
                try {
                    const insertCharacteristicQuery = "INSERT INTO characteristics (characteristic_id, name, img_url) VALUES (?, ?, ?)";
                    const insertCharacteristicParams = [characteristic.id, characteristic.name.fr, `https://dofusdb.fr/icons/characteristics/${characteristic.asset}.png`];
                    await pool.execute(insertCharacteristicQuery, insertCharacteristicParams);
                } catch (error) {
                    console.error("Error inserting item:", error);
                }
            }
        } 
    } catch (error) {
        console.log(error);
    }
}


// async function fetchRecipesAndInsertIntoDB(pool) {
//     let skip = 0;
//     try {
//         while (true) {
//             const responseRecipes = await axios.get(`https://api.beta.dofusdb.fr/recipes?$limit=50&$skip=${skip}`);
//             skip+=50;
//             const recipes = responseRecipes.data.data;

//             if (recipes.length === 0) {
//                 console.log("No more characteristics to fetch.");
//                 break;
//             }

//             for (const recipe of recipes) {
//                 try {
//                     const insertRecipeQuery = "INSERT INTO recipes (characteristic_id, name, img_url) VALUES (?, ?, ?)";
//                     const insertRecipeParams = [characteristic.id, characteristic.name.fr, `https://dofusdb.fr/icons/characteristics/${characteristic.asset}.png`];
//                     await pool.execute(insertCharacteristicQuery, insertCharacteristicParams);
//                 } catch (error) {
//                     console.error("Error inserting item:", error);
//                 }
//             }
//         } 
//     } catch (error) {
//         console.log(error);
//     }
// }

async function main() {
    const pool = await mysql.createPool(dbConfig);
    try {
        await fetchCharacteristicsAndInsertIntoDB(pool);    
        await fetchItemsAndInsertIntoDB(pool);
    } finally {
        await pool.end(); 
    }
}

main();

// CREATE TABLE IF NOT EXISTS doftopia.items (
// id INT AUTO_INCREMENT PRIMARY KEY,
// name VARCHAR(255),
// description TEXT,
// type VARCHAR(50),
// level INT,
// img VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS doftopia.effects (
// item_id INT,
// characteristic VARCHAR(255),
// `from` INT,
// `to` INT
// );

// create table items (
// id int AUTO_INCREMENT PRIMARY KEY,
// name varchar(255),
// description text,
// type varchar(50),
// level int,
// img varchar(255),
// puuid varchar(50),
// itemId varchar(50),
// effects JSON
// );