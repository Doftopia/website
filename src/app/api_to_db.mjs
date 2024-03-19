"use client";
import axios from "axios";
import mysql from "mysql2/promise"; 


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'doftopia'
};

async function fetchItemsAndInsertIntoDB(pool) {
    let queryCharac = "SELECT * FROM characteristics;"
    let queryEffects = "SELECT * FROM effects;"
    let characsInfo = {};
    let effectsInfo = {};
    
    try {
        const connection = await mysql.createConnection(dbConfig)
        characsInfo = await connection.execute(queryCharac);
        effectsInfo = await connection.execute(queryEffects);
    } catch (error) {
        console.error(error)
    }

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
                    const insertItemQuery = "INSERT INTO items (name, description, type, level, img, puuid, itemId, criteria, apCost, maxRange, nmbCast, criticalHitProbability, minRange, effects) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    for (let i = 0; i < item.effects.length; i++) {
                        characsInfo[0].forEach(characInfo => {
                            if (characInfo.characteristic_id == item.effects[i].characteristic) {
                                item.effects[i]['characName'] = characInfo.name;
                                item.effects[i]['characImg'] = characInfo.img_url;
                            }
                        });

                        if (item.effects[i].characteristic == -1) {
                            effectsInfo[0].forEach(effectInfo => {
                                if (effectInfo.id == item.possibleEffects[i].effectId) {
                                    item.effects[i]['characName'] = effectInfo.description;
                                    console.log(effectInfo);
                                    // item.effects[i]['characImg'] = 'https://dofusdb.fr/icons/characteristics/tx_strength.png';
                                }
                            });
                        }
                    }

                    const effects = JSON.stringify(item.effects);
                    const insertItemParams = [item.name.fr, item.description.fr, item.type.name.fr, item.level, item.imgset[1].url, item._id, item.id, item.criteria || null, item.apCost || null, item.range || null, item.maxCastPerTurn || null, item.criticalHitProbability || null, item.minRange || null, effects];
                    await pool.execute(insertItemQuery, insertItemParams);
                } catch (error) {
                    // console.error("Error inserting item:", error);
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
                    // console.error("Error inserting item:", error);
                }
            }
        } 
    } catch (error) {
        console.log(error);
    }
}


async function fetchEffectsAndInsertIntoDB(pool) {
    let skip = 0;
    try {
        while (true) {
            const responseEffects = await axios.get(`https://api.beta.dofusdb.fr/effects?$limit=50&$skip=${skip}`);
            skip+=50;
            const effects = responseEffects.data.data;

            if (effects.length === 0) {
                console.log("No more effects to fetch.");
                break;
            }

            for (const effect of effects) {
                try {
                    const insertEffectQuery = "INSERT INTO effects (id, description, characteristic) VALUES (?, ?, ?)";
                    const insertEffectParams = [effect.id, effect.description.fr || undefined, effect.characteristic];
                    await pool.execute(insertEffectQuery, insertEffectParams);
                } catch (error) {
                    // console.error("Error inserting item:", error);
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
    try {
        const pool = await mysql.createPool(dbConfig);
        // await fetchCharacteristicsAndInsertIntoDB(pool);    
        // await fetchEffectsAndInsertIntoDB(pool);
        await fetchItemsAndInsertIntoDB(pool);
        await pool.end(); 
    } catch (error) {
        console.log(error);
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

// create table items (
// id int AUTO_INCREMENT PRIMARY KEY,
// name varchar(255),
// description text,
// type varchar(100),
// level int,
// img varchar(255),
// puuid varchar(255),
// itemId int,
// criteria varchar(255),
// apCost int,
// maxRange int,
// nmbCast int,
// criticalHitProbability int,
// minRange int,
// effects JSON
// );
