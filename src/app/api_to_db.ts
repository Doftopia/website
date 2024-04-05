"use client";
import axios from "axios";
import * as mysql from "mysql2/promise"; 

const dbConfig = {
    host: 'localhost',
    user: 'doftopia',
    password: '1234',
    database: 'doftopia'
};

async function fetchItemsAndInsertIntoDB(pool: mysql.Pool) {
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
        setId INT,
        effectId INT
    );`
    await pool.execute(query);
    const insertItemQuery = "INSERT INTO items (name, description, level, img, imgHighRes, id, apCost, maxRange, minRange, nmbCast, criticalHitProbability, weaponDmgFrom, weaponDmgTo, itemCharacteristics, type, setName, setId, effectId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
                    if (item.effects.length == 0) {
                        insertItemParams = [item.name.fr, item.description.fr, item.level, item.imgset[0].url, item.imgset[2].url, item.id, null, null ,null, null, null, null, null, null, item.type.name.fr, null, null, null];
                        await pool.execute(insertItemQuery, insertItemParams);
                    } else {
                        for (let i = 0; i < item.effects.length; i++) {
                            try {
                                if (item.itemSet == null) {
                                    insertItemParams = [item.name.fr, item.description.fr, item.level, item.imgset[0].url, item.imgset[2].url, item.id, item.apCost || null, item.range || null , item.minRange || null, item.maxCastPerTurn || null, item.criticalHitProbability || null, item.effects[i].from || null, item.effects[i].to || null, item.effects[i].characteristic || null, item.type.name.fr, null, null, item.possibleEffects[i].effectId || null || undefined];
                                } else {
                                    insertItemParams = [item.name.fr, item.description.fr, item.level, item.imgset[0].url, item.imgset[2].url, item.id, item.apCost || null, item.range || null , item.minRange || null, item.maxCastPerTurn || null, item.criticalHitProbability || null, item.effects[i].from || null, item.effects[i].to || null, item.effects[i].characteristic || null, item.type.name.fr, item.itemSet.name.fr || null, item.itemSet.name.id || null, item.possibleEffects[i].effectId || null || undefined];
                                }
                                await pool.execute(insertItemQuery, insertItemParams);
                            } catch (error) {
                                // console.error('error in itemInsertParams ', error);
                            }
                        }
                    }
                } catch (error) {
                    console.log('error in item loop ', error);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}


async function fetchCharacteristicsAndInsertIntoDB(pool: mysql.Pool) {
    let skip = 0;
    let query = `CREATE TABLE IF NOT EXISTS characteristics (
        characteristic_id int NOT NULL,
        name varchar(100) NOT NULL,
        img_url varchar(100) NOT NULL
    );`
    await pool.execute(query);
    const insertCharacteristicQuery = "INSERT INTO characteristics (characteristic_id, name, img_url) VALUES (?, ?, ?)";

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
                    const insertCharacteristicParams = [characteristic.id, characteristic.name.fr, `https://dofusdb.fr/icons/characteristics/${characteristic.asset}.png`];
                    await pool.execute(insertCharacteristicQuery, insertCharacteristicParams);
                } catch (error) {
                    // console.error("Error inserting item:", error);
                }
            }
        } 
    } catch (error) {
        // console.log(error);
    }
}


async function fetchEffectsAndInsertIntoDB(pool: mysql.Pool) {
    let skip = 0;
    let query = `CREATE TABLE IF NOT EXISTS effects (
        id int NOT NULL,
        description text NOT NULL,
        characteristic int NOT NULL
    );`
    await pool.execute(query);
    const insertEffectQuery = "INSERT INTO effects (id, description, characteristic) VALUES (?, ?, ?)";

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


async function fetchRecipesAndInsertIntoDB(pool: mysql.Pool) {
    let skip = 0;
    let ingredients: String[] = [];
    let quantities: String[] = [];
    let query = `CREATE TABLE IF NOT EXISTS recipes (
        resultId INT NOT NULL,
        quantities INT NOT NULL,
        ids INT NOT NULL,
        jobId INT NOT NULL
    );`;
    await pool.execute(query);
    const insertRecipesQuery = "INSERT INTO recipes (resultId, quantities, ids, jobId) VALUES(?, ?, ?, ?)"

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
                recipe.quantities.forEach((quantity: Number) => {
                    quantities.push(quantity.toString());
                });
                recipe.ingredientIds.forEach((ingredient: Number) => {
                    ingredients.push(ingredient.toString());
                });
                for (let i = 0; i < ingredients.length; i++) {
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


async function fetchJobsAndInsertIntoDB(pool: mysql.Pool) {
    let query = `CREATE TABLE IF NOT EXISTS jobs (
        jobId int,
        jobName varchar(50)
    );`;
    await pool.execute(query);
    const insertJobsQuery = "INSERT INTO jobs (jobId, jobName) VALUES(?, ?)"

    try {
        while (true) {
            const jobsResponse = await axios.get(`https://api.beta.dofusdb.fr/jobs?$limit=22`);
            let jobs = jobsResponse.data.data;

            for (const job of jobs) {
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


async function fetchItemSetsAndInsertIntoDB(pool: mysql.Pool) {
    let query = `CREATE TABLE IF NOT EXISTS itemSets (
        setName VARCHAR(100),
        setId INT,
        numberItem INT,
        charac INT,
        characValue INT,
        setLevel INT
    );`;
    await pool.execute(query);
    let skip = 0;
    const insertJobsQuery = "INSERT INTO itemSets (setName, setId, numberItem, charac, characValue, setLevel) VALUES(?, ?, ?, ?, ?, ?)"

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


async function fetchItemsTypeAndInsertIntoDB(pool: mysql.Pool) {
    let skip = 0;
    let query = `CREATE TABLE IF NOT EXISTS itemsType (
        name varchar(100),
        id int
    )`;
    await pool.execute(query);
    const insertIntoItemTypeQuery = "INSERT INTO itemsType (name, id) VALUES(?, ?)";

    try {
        while (true) {
            const response = await axios.get(`https://api.beta.dofusdb.fr/item-types?$limit=50&$skip=${skip}`)
            skip+=50;
            let itemsType = response.data.data;

            if (itemsType.length == 0) {
                console.log('Finished fetching items type.');
                break;
            }

            for (const itemType of itemsType) {
                try {
                    const insertItemsTypeParams = [itemType.name.fr, itemType.id];
                    await pool.execute(insertIntoItemTypeQuery, insertItemsTypeParams);
                } catch (error) {
                    console.error(`error inserting itemtype ${error}`)
                }
            }
        }
    } catch (error) {
        console.error(`error fetching items-type: ${error}`)
    }
}


async function fetchMobsAndInsertIntoDB(pool: mysql.Pool) {
    let query = `CREATE TABLE IF NOT EXISTS mobs (
        name VARCHAR(100),
        id INT,
        level INT,
        img TEXT,
        lifePoints INT,
        actionPoints INT,
        mouvementPoints INT,
        vitality INT,
        paDodge INT,
        pmDodge INT,
        wisdom INT,
        earthResistance INT,
        airResistance INT,
        fireResistance INT,
        waterResistance INT,
        neutralResistance INT,
        strength INT,
        intelligence INT,
        chance INT,
        agility INT
    );`;
    pool.execute(query);

    const insertMobsQuery = "INSERT INTO mobs (name, id, level, img, lifePoints, actionPoints, mouvementPoints, vitality, paDodge, pmDodge, wisdom, earthResistance, airResistance, fireResistance, waterResistance, neutralResistance, strength, intelligence, chance, agility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
        let skip = 0;
        while (true) {
            const mobsResponse = await axios.get(`https://api.beta.dofusdb.fr/monsters?$limit=50&$skip=${skip}`);
            skip+=50;
            let mobs = mobsResponse.data.data

            if (mobs.length == 0) {
                console.log('finished fetching mobs.');
                return;
            }
            for (const mob of mobs) {
                for (const grade of mob.grades) {
                    try {
                        const insertMobsParams = [mob.name.fr, mob.id, grade.level, mob.img, grade.lifePoints, grade.actionPoints, grade.movementPoints, grade.vitality, grade.paDodge, grade.pmDodge, grade.wisdom, grade.earthResistance, grade.airResistance, grade.fireResistance, grade.waterResistance, grade.neutralResistance, grade.strength, grade.intelligence, grade.chance, grade.agility];
                        await pool.execute(insertMobsQuery, insertMobsParams)
                    } catch (error) {
                        console.error(`error insterting into mobs${error}`);
                    }
                }
            };
        }
    } catch (error) {
        console.error(`error in while true ${error}`)
    }
}

async function fetchSpellsAndInsertIntoDB(pool: mysql.Pool) {
    let query = `CREATE TABLE IF NOT EXISTS spells (
        spellName VARCHAR(100),
        spellId INT,
        mobId INT
    );`;
    pool.execute(query);
    try {
        while (true) {
        }
    } catch (error) {
        console.error(error)
    }
}


async function fetchMobsDropAndInsertIntoDB(pool: mysql.Pool) {
    let query = `CREATE TABLE IF NOT EXISTS mobsDrop (
        mobId INT,
        dropId INT
    );`
    pool.execute(query);
    let skip = 0;
    const insertDropsQuery = "INSERT INTO mobsDrop (mobId, dropId) VALUES (?, ?)";
    try {
        while (true) {
            const dropsReponse = await axios.get(`https://api.dofusdb.fr/monsters?$limit=50&$skip=${skip}`);
            skip += 50;
            let mobs = dropsReponse.data.data;

            if (mobs.length == 0) {
                console.log('finished fetching drops.');
                return;
            }

            for (const mob of mobs) {
                try {
                    for (const drop of mob.drops) {
                        const insertDropsParams = [drop.monsterId, drop.dropId];
                        await pool.execute(insertDropsQuery, insertDropsParams);
                    }
                } catch (error) {
                    // console.log(`No drop${error}`);
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
        // await fetchRecipesAndInsertIntoDB(pool);
        // await fetchJobsAndInsertIntoDB(pool); 
        // await fetchItemSetsAndInsertIntoDB(pool); 
        // await fetchItemsAndInsertIntoDB(pool);
        // await fetchMobsAndInsertIntoDB(pool);
        // await fetchItemsTypeAndInsertIntoDB(pool);
        // await fetchMobsDropAndInsertIntoDB(pool);
        await pool.end(); 
    } catch (error) {
        console.log(error);
    }
}

main();