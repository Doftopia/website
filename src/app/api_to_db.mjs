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
    let skip = 0;
    let insertItemParams;
    let effect = {};
    let query = `CREATE TABLE IF NOT EXISTS items (
        name VARCHAR(100),
        description text,
        level INT,
        img VARCHAR(100),
        imgHighRes VARCHAR(100),
        id INT,
        apCost INT,
        maxRange INT,
        minRange INT,
        nmbCast INT,
        criticalHitProbability INT,
        weaponDmgFrom INT,
        weaponDmgTo INT,
        itemCharacteristics INT,
        type VARCHAR(50),
        setName VARCHAR(100),
        setId INT
    );`
    await pool.execute(query);
    try {
        while (true) {
            const responseItems = await axios.get(`https://api.beta.dofusdb.fr/items?$limit=150&$skip=${skip}`);
            skip += 50;
            const items = responseItems.data.data;

            if (items.length === 0) {
                console.log("No more items to fetch.");
                break;
            }

            for (const item of items) {
                try {
                    const insertItemQuery = "INSERT INTO items (name, description, level, img, imgHighRes, id, apCost, maxRange, minRange, nmbCast, criticalHitProbability, weaponDmgFrom, weaponDmgTo, itemCharacteristics, type, setName, setId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    if (item.effects.length == 0) {
                        insertItemParams = [item.name.fr, item.description.fr, item.level, item.imgset[2].url, item.imgset[3].url, item.id, null, null ,null, null, null, null, null, null, item.type.name.fr, null, null];
                        await pool.execute(insertItemQuery, insertItemParams);
                    } else {
                        for (const effect of item.effects) {
                            insertItemParams = [item.name.fr, item.description.fr, item.level, item.imgset[2].url, item.imgset[3].url, item.id, item.apCost || null, item.range || null , item.minRange || null, item.maxCastPerTurn || null, item.criticalHitProbability || null, effect.from || null, effect.to || null, effect.characteristic || null, item.type.name.fr, item.itemSet.name.fr || null, item.itemSet.name.id || null];
                            await pool.execute(insertItemQuery, insertItemParams);
                        }
                    }
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
    let query = `CREATE TABLE IF NOT EXISTS characteristics (
        characteristic_id int NOT NULL,
        name varchar(100) NOT NULL,
        img_url varchar(100) NOT NULL
    );`
    await pool.execute(query);
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
    let query = `CREATE TABLE IF NOT EXISTS effects (
        id int NOT NULL,
        description text NOT NULL,
        characteristic int NOT NULL
    );`
    await pool.execute(query);
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
        // console.log(error);
    }
}


async function fecthRecipesAndInsertIntoDB(pool) {
    let skip = 0;
    let ingredients = [];
    let quantities = [];
    let query = `CREATE TABLE IF NOT EXISTS recipes (
        resultId int NOT NULL,
        quantities int NOT NULL,
        ids int NOT NULL,
        jobId int NOT NULL
    );`;
    await pool.execute(query);
    try {
        while (true) {
            const responseRecipes = await axios.get(`https://api.beta.dofusdb.fr/recipes?$limit=50&$skip=${skip}`);
            skip+=50;
            let recipes = responseRecipes.data.data;

            if (recipes.length == 0) {
                console.log("no more recipes to fetch.");
                break;
            }

            for (const recipe of recipes) {
                recipe.quantities.forEach(quantity => {
                    quantities.push(quantity);
                });
                recipe.ingredientIds.forEach(ingredient => {
                    ingredients.push(ingredient);
                });
                for (let i = 0; i < ingredients.length; i++) {
                    const insertRecipesQuery = "INSERT INTO recipes (resultId, quantities, ids, jobId) VALUES(?, ?, ?, ?)"
                    const insertRecipesParams = [recipe.resultId, quantities[i], ingredients[i], recipe.jobId];
                    await pool.execute(insertRecipesQuery, insertRecipesParams)
                }
                ingredients = [];
                quantities = [];
            };
        } 
    } catch (error) {
        console.error(error);
    }
}


async function fetchJobsAndInsertIntoDB(pool) {
    let query = `CREATE TABLE IF NOT EXISTS jobs (
        jobId int,
        jobName varchar(50)
    );`;
    await pool.execute(query);
    try {
        while (true) {
            const jobsResponse = await axios.get(`https://api.beta.dofusdb.fr/jobs?$limit=22`);
            let jobs = jobsResponse.data.data;

            for (const job of jobs) {
                const insertJobsQuery = "INSERT INTO jobs (jobId, jobName) VALUES(?, ?)"
                const insertJobsParams = [job.id, job.name.fr];
                await pool.execute(insertJobsQuery, insertJobsParams);
            }
            console.log('no more jobs to fetch');
            break;
        }
    } catch (error) {
        console.error(error);
    }
}


async function fetchItemSetsAndInsertIntoDB(pool) {
    let query = `CREATE TABLE IF NOT EXISTS itemSets (
        setName varchar(100),
        setId int,
        numberItem int,
        charac int,
        characValue int,
        setLevel int
    );`;
    await pool.execute(query);
    let skip = 0;
    try {
        while (true) {
            const itemSetsResponse = await axios.get(`https://api.beta.dofusdb.fr/item-sets?$limit=50&$skip=${skip}`);
            skip += 50;
            let itemSets = itemSetsResponse.data.data;

            if (itemSets.length == 0) {
                console.log("finished fetching itemSets.");
                break;
            }

            for (const itemSet of itemSets) {
                for (let i = 0; i < itemSet.effects.length; i++) {
                    const insertJobsQuery = "INSERT INTO itemSets (setName, setId, numberItem, charac, characValue, setLevel) VALUES(?, ?, ?, ?, ?, ?)"
                    for (const itemEffect of itemSet.effects[i]) {
                        const insertJobsParams = [itemSet.name.fr, itemSet.name.id, i+1, itemEffect.characteristic || null, itemEffect.from || null, itemSet.items[0].level];
                        await pool.execute(insertJobsQuery, insertJobsParams);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    try {
        const pool = await mysql.createPool(dbConfig);
        // await fetchCharacteristicsAndInsertIntoDB(pool);    
        // await fetchEffectsAndInsertIntoDB(pool);
        // await fecthRecipesAndInsertIntoDB(pool);
        // await fetchItemsAndInsertIntoDB(pool );
        // await fetchJobsAndInsertIntoDB(pool); 
        await fetchItemSetsAndInsertIntoDB(pool); 
        await pool.end(); 
    } catch (error) {
        console.log(error);
    }
}

main();