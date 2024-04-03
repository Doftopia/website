import * as express from 'express';
import * as cors from 'cors';
import * as mysql from "mysql2/promise";
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';

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
    user: 'root',
    password: '1234',
    database: 'doftopia'
};

const pool = mysql.createPool(dbConfig);

app.get("/items", async (req: Request, res: Response) => {
    let itemQuery = `SELECT items.name AS itemName, characteristics.name AS characName, items.id as itemId, characteristics.img_url as characImg, items.description as itemDescription, items.level, items.type, items.img, items.imgHighRes, items.apCost, items.maxRange, items.minRange, effects.description as effectDescription, items.nmbCast, items.criticalHitProbability, items.weaponDmgFrom as characFrom, items.weaponDmgTo as characTo, items.itemCharacteristics as characId, setName, setId, effectId FROM items LEFT JOIN characteristics ON items.itemCharacteristics = characteristics.characteristic_id LEFT JOIN effects on items.effectId = effects.id`;
    let base_limit: number = 10;
    let base_skip: number = 0;
    let item_limit = base_limit;
    let skip_limit = base_skip;
    const queryParams = [];
    const filters = [];

    if (req.query.id) {
        filters.push(`items.id = ?`);
        queryParams.push(req.query.id);
    }
    
    if (req.query.name) {
        filters.push(`items.name LIKE ?`);
        queryParams.push(`%${req.query.name}%`);
    }

    if (req.query.setId) {
        filters.push(`items.setId = ?`);
        queryParams.push(req.query.setId);
    }

    if (req.query.minLevel) {
        filters.push(`items.level >= ?`);
        queryParams.push(req.query.minLevel);
    }

    if (req.query.maxLevel) {
        filters.push(`items.level <= ?`);
        queryParams.push(req.query.maxLevel);
    }
    
    if (req.query.effect) {
        const effects = Array.isArray(req.query.effect) ? req.query.effect : [req.query.effect];
        effects.forEach((effect: ParsedQs | string) => {
            filters.push(`items.name IN (
                SELECT DISTINCT
                items.name
                FROM
                items
                LEFT JOIN
                characteristics ON items.itemCharacteristics = characteristics.characteristic_id
                WHERE
                characteristics.characteristic_id LIKE ?
                AND items.weaponDmgFrom > 0
                )`);
            queryParams.push(effect);
        });
    }

    if (req.query.category) {
        const categories = Array.isArray(req.query.category) ? req.query.category : [req.query.category];
        const categoryFilters = categories.map(() => `items.type like ?`).join(' OR ');
        filters.push(`(${categoryFilters})`);
        categories.forEach((category: ParsedQs | string) => {
            queryParams.push(category);
        });
    }
    
    if (filters.length > 0) {
        itemQuery += ` WHERE ${filters.join(' AND ')}`;
    }
    
    if (req.query.limit) {
        base_limit = Number(req.query.limit);
    }

    if (req.query.skip) {
        base_skip = Number(req.query.skip);
    }

    interface Item {
        itemName: string;
        characName: string;
        itemId: number;
        characImg: string;
        itemDescription: string;
        level: number;
        type: string;
        img: string;
        imgHighRes: string;
        apCost: number;
        maxRange: number;
        minRange: number;
        effectDescription: string;
        nmbCast: number;
        criticalHitProbability: number;
        characFrom: number;
        characTo: number;
        characId: number;
        setName: string;
        setId: number;
        effectId: number;
    }

    interface GroupedItem {
        itemName: string;
        itemId: number;
        description: string;
        level: number;
        type: string;
        img: string;
        imgHighRes: string;
        apCost: number;
        minRange: number;
        maxRange: number;
        nmbCast: number;
        criticalHitProbability: number;
        setName: string;
        setID: number;
        characteristics: Characteristic[];
    }

    interface Characteristic {
        characName: string;
        characFrom: number;
        characTo: number;
        characImg: string;
        characId: number;
        effectId: number;
    }

    let groupedData: GroupedItem[] = [];

    item_limit = base_limit;
    skip_limit = base_skip;
        
    const element_to_icon: { [key: string]: string } = {
        'Neutre': 'https://dofusdb.fr/icons/characteristics/tx_neutral.png',
        'Feu': 'https://dofusdb.fr/icons/characteristics/tx_intelligence.png',
        'Eau': 'https://dofusdb.fr/icons/characteristics/tx_chance.png',
        'Terre': 'https://dofusdb.fr/icons/characteristics/tx_strength.png',
        'Air': 'https://dofusdb.fr/icons/characteristics/tx_agility.png'
    };

    try {
        const [results, _] = await pool.query(itemQuery, queryParams);

        (results as Item[]).forEach((result: Item, index: number) => {
            if (index >= base_limit) {
                return;
            }
            try {
                if (result.characId == -1) {
                    for (const element in element_to_icon) {
                        if (result.effectDescription.includes(element)) {
                            result.characImg = element_to_icon[element];
                            break;
                        }
                    }
                }

                let existingItem = groupedData.find(item => item.itemName === result.itemName);
                if (result.effectDescription !== null) {
                    result.effectDescription = result.effectDescription.split('2')[2];
                        if (result.effectDescription !== undefined) {
                            if (result.effectDescription.includes('{~ps}{~zs}')) {
                                result.effectDescription = `${result.effectDescription.split('{')[0]} ${result.effectDescription.split('}')[2]}`;
                            }
                        }
                    }
                if (!existingItem) {
                    existingItem = { itemName: result.itemName, itemId: result.itemId, description: result.itemDescription, level: result.level, type: result.type, img: result.img, imgHighRes: result.imgHighRes, apCost: result.apCost, minRange: result.minRange, maxRange: result.maxRange, nmbCast: result.nmbCast, criticalHitProbability: result.criticalHitProbability, setName: result.setName, setID: result.setId, characteristics: [] };
                    groupedData.push(existingItem);
                } else {
                    base_limit += 1;
                }
                existingItem.characteristics.push({ characName: result.effectDescription, characFrom: result.characFrom, characTo: result.characTo, characImg: result.characImg, characId: result.characId, effectId: result.effectId});
            } catch (error) {
                console.error(error)
            }
        });
        
    } catch (error) {
        console.error(`Error fetching items: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ limit: item_limit, skip: skip_limit, data: groupedData.slice(base_skip, base_limit) });
});


app.get('/jobs', async (req: Request, res: Response) => {
    let itemQuery = `SELECT * from jobs`
    const queryParams = [];
    
    if (req.query.id) {
        itemQuery += ` WHERE jobs.jobId = ?`;
        queryParams.push(req.query.id);
    }
    
    try {
        const [results, _] = await pool.query(itemQuery, queryParams);
        res.json({data: results})
    } catch (error) {
        console.error(`Error fetching jobs: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/items-type', async (req: Request, res: Response) => {
    let itemQuery = `SELECT * from itemsType`
    const queryParams = [];

    if (req.query.category) {
        itemQuery += ` WHERE itemstype.name LIKE ?`;
        queryParams.push(`%${req.query.category}%`)
    }

    try {
        const [results, _] = await pool.query(itemQuery, queryParams);
        res.json({data: results})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});


app.get('/recipes', async (req: Request, res: Response) => {
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
        recipes.jobId 
    ORDER BY
        recipes.quantities DESC `

    let groupedData: GroupedData[] = [];
    let recipe: Recipes[] = []
    let previousItemId: number = 0;

    interface Recipes {
        quantity: number;
        itemName: string;
        itemId: number;
        itemImg: string;
    };

    interface Recipe {
        resultId: number;
        quantities: number;
        ids: number;
        jobId: number;
        itemName: string;
        itemImg: string; 
        itemLevel: string;
        itemId: number;
    };

    interface GroupedData {
        resultItemId: number;
        jobId: number;
        itemLevel: string;
        recipe: Recipes[];
    };

    try {
        const [results, fields] = await pool.query(itemQuery, queryParams);
        const rows = results as mysql.RowDataPacket[];

        if (rows.length > 0) {
            previousItemId = rows[0].resultId;
        }

        (results as mysql.RowDataPacket).forEach((result: Recipe) => {
            try {
                if (previousItemId != result.resultId) {
                    groupedData.push({resultItemId: previousItemId, jobId: result.jobId, itemLevel: result.itemLevel, recipe: recipe});
                    previousItemId = result.resultId;
                    recipe = [];
                } 
                recipe.push({quantity: result.quantities, itemName: result.itemName, itemId: result.ids, itemImg: result.itemImg});
            } catch (error) {
                console.error(error);
            }
        });

        try {
            groupedData.push({resultItemId: previousItemId, jobId: rows[rows.length-1].jobId, itemLevel: rows[rows.length-1].itemLevel, recipe: recipe});
        } catch (error) {
            console.log(`trying to access an item without characs: ${error}`);
        }

        res.json({data: groupedData});
    } catch (error) {
        console.error(`Error fetching recipes: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});


app.get('/itemSets', async (req: Request, res: Response) => {
    let itemQuery = `SELECT * from itemSets
    join characteristics on itemSets.charac = characteristics.characteristic_id`;
    const queryParams = [];

    if (req.query.id) {
        itemQuery += ` WHERE itemSets.setId = ?`;
        queryParams.push(req.query.id);
    }

    let groupedData: GroupedData[] = [];
    let charac: Charac[] = []
    let nmbItems: NmbItems[] = [];
    let previousSetId: number = 0;
    let previousNmbItems: number = 0;

    interface Item {
        setId: number;
        setName: string;
        setLevel: number;
        numberItem: number;
        name: string;
        characValue: number;
        img_url: string;
    };

    interface Charac {
        characName: string;
        characValue: number;
        characImg: string;
    };

    interface NmbItems {
        characs: Charac[];
        nmbItems: number;
    };

    interface GroupedData {
        nmbItems: NmbItems[];
        setName: string;
        setId: number;
        setLevel: number;
    };

    try {
        const [results, fields] = await pool.query(itemQuery, queryParams);
        const rows = results as mysql.RowDataPacket[];
        console.log(fields);

        if (rows.length > 0) {
            previousSetId = rows[0].setId;
            previousNmbItems = rows[0].numberItem;
        }

        (results as mysql.RowDataPacket).forEach((result: Item, index: number) => {
            try {
                if (previousNmbItems != result.numberItem || index == rows.length-1) {
                    if (index == rows.length-1) {
                        charac.push({characName: result.name, characValue: result.characValue, characImg: result.img_url});
                        nmbItems.push({characs: charac, nmbItems: previousNmbItems});
                    } else {
                        nmbItems.push({characs: charac, nmbItems: previousNmbItems});
                    }
                    previousNmbItems = result.numberItem;
                    charac = []; 
                } 
                
                if (previousSetId != result.setId) {
                    groupedData.push({nmbItems: nmbItems, setName: result.setName, setId: result.setId, setLevel: result.setLevel});
                    previousSetId = result.setId;
                    nmbItems = [];
                }
                charac.push({characName: result.name, characValue: result.characValue, characImg: result.img_url});
            } catch (error) {
                console.error(`error parsing set ${error}`);
            }
        });
        groupedData.push({nmbItems: nmbItems, setName: rows[rows.length-1].setName, setId: rows[rows.length-1].setId, setLevel: rows[rows.length-1].setLevel});
        res.json({data: groupedData})
    } catch (error) {
        console.error(`Error fetching sets: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    };
});


app.get('/mobs', async (req: Request, res: Response) => {
    let groupedData: GroupedData[] = [];
    let mobCharac: MobCharac[] = [];
    let base_limit = 10;
    let previousMobID = 0;
    let itemQuery = `SELECT * from mobs`;
    const queryParams = [];
    let previousMobName = "";
    let previousMobImg = ""; 
    let limit = base_limit;
    
    if (req.query.id) {
        itemQuery += ` WHERE id = ?`;
        queryParams.push(req.query.id);
    }

    interface Mob {
        id: number;
        name: string;
        level: number;
        lifePoints: number;
        actionPoints: number;
        mouvementPoints: number;
        vitality: number;
        paDodge: number;
        pmDodge: number;
        wisdom: number;
        earthResistance: number;
        fireResistance: number;
        airResistance: number;
        waterResistance: number;
        neutralResistance: number;
        strength: number;
        intelligence: number;
        chance: number;
        agility: number;
        img: string;
    };

    interface MobCharac {
        level: number;
        lifePoints: number;
        ap: number;
        mp: number;
        vitality: number;
        paDodge: number;
        pmDodge: number;
        wisdom: number;
        earthResistance: number;
        fireResistance: number;
        airResistance: number;
        waterResistance: number;
        neutralResistance: number;
        strength: number;
        intelligence: number;
        chance: number;
        agility: number;
    };

    interface GroupedData {
        name: string;
        id: number;
        characs: MobCharac[];
        img: string;
    };

    try {
        const [results, fields] = await pool.query(itemQuery, queryParams);
        const rows = results as mysql.RowDataPacket[];

        if (rows.length != 0) {
            previousMobID = rows[0].id;
            previousMobName = rows[0].name;
            previousMobImg = rows[0].img;
        }

        (results as mysql.RowDataPacket).forEach((result: Mob, index: number) => {
            if (index >= limit) {
                return;
            }
            if (result.id != previousMobID || result.id == rows[rows.length-1].id && result.lifePoints == rows[rows.length-1].lifePoints) {
                groupedData.push({name: previousMobName, id: previousMobID, characs: mobCharac, img: previousMobImg});
                previousMobID = result.id;
                previousMobName = result.name;
                previousMobImg = result.img
                mobCharac = [];
                mobCharac.push({level: result.level, lifePoints: result.lifePoints, ap: result.actionPoints, mp: result.mouvementPoints, vitality: result.vitality, paDodge: result.paDodge, pmDodge: result.pmDodge, wisdom: result.wisdom, earthResistance: result.earthResistance, fireResistance: result.fireResistance, airResistance: result.airResistance, waterResistance: result.waterResistance, neutralResistance: result.neutralResistance, strength: result.strength, intelligence: result.intelligence, chance: result.chance, agility: result.agility});
            } else {
                limit+=1
                mobCharac.push({level: result.level, lifePoints: result.lifePoints, ap: result.actionPoints, mp: result.mouvementPoints, vitality: result.vitality, paDodge: result.paDodge, pmDodge: result.pmDodge, wisdom: result.wisdom, earthResistance: result.earthResistance, fireResistance: result.fireResistance, airResistance: result.airResistance, waterResistance: result.waterResistance, neutralResistance: result.neutralResistance, strength: result.strength, intelligence: result.intelligence, chance: result.chance, agility: result.agility});
            }
        });
        res.json({limit: base_limit, total: rows.length, data: groupedData})
    } catch (error) {
        console.error(`Error fetching mobs: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    };
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});