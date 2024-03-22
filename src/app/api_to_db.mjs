"use client";
import axios from "axios";
import mysql from "mysql2/promise"; 

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
                    const insertItemQuery = "INSERT INTO items (name, description, level, img, imgHighRes, id, apCost, maxRange, minRange, nmbCast, criticalHitProbability, weaponDmgFrom, weaponDmgTo, weaponDmgCharacteristic, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    for (const effect of item.effects) {
                        const insertItemParams = [item.name.fr, item.description.fr, item.level, item.imgset[2].url, item.imgset[3].url, item.id, item.apCost || null, item.range || null , item.minRange || null, item.maxCastPerTurn || null, item.criticalHitProbability || null, effect.from, effect.to, effect.characteristic, item.type.name.fr];
                        await pool.execute(insertItemQuery, insertItemParams);
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
        // console.log(error);
    }
}


async function fecthRecipesAndInsertIntoDB(pool) {
    let skip = 0;
    let ingredients = [];
    let quantities = [];
    try {
        while (true) {
            const responseRecipes = await axios.get(`https://api.beta.dofusdb.fr/recipes?$limit=50&$skip=${skip}`);
            skip+=50;
            let recipes = responseRecipes.data.data;
            for (const recipe of recipes) {
                recipe.quantities.forEach(quantity => {
                    quantities.push(quantity);
                });
                recipe.ingredientIds.forEach(ingredient => {
                    ingredients.push(ingredient);
                });
                for (let i = 0; i < ingredients.length; i++) {
                    const insertRecipesQuery = "INSERT INTO recipes (resultName, quantities, ids, jobId) VALUES(?, ?, ?, ?)"
                    const insertRecipesParams = [recipe.resultName.fr, quantities[i], ingredients[i], recipe.jobId];
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


//Criterias are only accessible from item.criteria. Then you have to use it on /criteria/[] therefore this will be a bit slow.
async function fetchCriteriaAndInsertIntoDB(pool) {
    let skip = 0;
    let criterias = [];
    let criteriaFilter;
    while (true) {
        const responseItems = await axios.get(`https://api.beta.dofusdb.fr/items?$limit=50&$skip=${skip}`);
        skip+=50
        let items = responseItems.data.data;

        if (items.length == 0) {
            console.log("No more criterias to fetch.");
            break;
        }

        for (const item of items) {
            if (item.criteria !== null && item.criteria != "") {
                if (!criterias.includes(item.criteria)) {
                    criterias.push(`${item.criteria}&`);
                }   
            }
        }
    }

    let index = 0;
    let criteriaResponse = "";
    for (const criteria of criterias) {
        criteriaFilter += criteria+'&'
        if (index == 50) {
            // console.log(`https://api.dofusdb.fr/criterion/${criteriaFilter}`);
            criteriaResponse = await axios.get(`https://api.dofusdb.fr/criterion/${criteriaFilter}`)
            // console.log(criteriaResponse.data);
            // criteriaResponse.forEach(criteriaRes => {
            //     try {
            //         criteriaRes.forEach(cri => {
            //             console.log(cri);
            //         });
            //         console.log("END\NEND\NEND\N"+criteria);
            //         // const insertCriteriaQuery = "INSERT INTO criteria (criteriaId, description) VALUES (?, ?)";
            //         // const insertQuerytParams = [cr];
            //         // await pool.execute(insertCriteriaQuery, insertQuerytParams);

            //         // console.log(`name ${criteria.name.fr}`);
            //         // console.log(`rules ${criteria.rules.fr}`);
            //         // console.log(`femaleName ${nameFemale.fr}`);
            //         // console.log(`rules ${criteria.rules.fr}`);
            //         // criteria.forEach(conditions => {
            //         //     console.log(`conditions ${conditions}`);
            //         // });
            //     } catch (error) {
            //     }
            // });
            index = 0;
            criteriaFilter = "";
            // name.fr nameMale.fr nameFemale.fr || foreach and get all || rules.fr
        }
        index += 1;
    }
}


async function main() {
    try {
        const pool = await mysql.createPool(dbConfig);
        // await fetchCriteriaAndInsertIntoDB(pool);
        // await fetchCharacteristicsAndInsertIntoDB(pool);    
        // await fetchEffectsAndInsertIntoDB(pool);
        await fetchItemsAndInsertIntoDB(pool);
        // await fecthRecipesAndInsertIntoDB(pool);
        await pool.end(); 
    } catch (error) {
        console.log(error);
    }
}

main();