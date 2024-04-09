"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var mysql = require("mysql2/promise");
var app = express();
var port = 3000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}), cors());
var dbConfig = {
    host: 'localhost',
    user: 'doftopia',
    password: '1234',
    database: 'doftopia'
};
var pool = mysql.createPool(dbConfig);
app.get("/items", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemQuery, base_limit, base_skip, item_limit, skip_limit, queryParams, filters, placeholders, effects, categories, categoryFilters, groupedData, element_to_icon, _a, results, _, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                itemQuery = "SELECT items.name AS itemName, characteristics.name AS characName, items.id as itemId, characteristics.img_url as characImg, items.description as itemDescription, items.level, items.type, items.img, items.imgHighRes, items.apCost, items.maxRange, items.minRange, effects.description as effectDescription, items.nmbCast, items.criticalHitProbability, items.weaponDmgFrom as characFrom, items.weaponDmgTo as characTo, items.itemCharacteristics as characId, setName, setId, effectId FROM items LEFT JOIN characteristics ON items.itemCharacteristics = characteristics.characteristic_id LEFT JOIN effects on items.effectId = effects.id";
                base_limit = 10;
                base_skip = 0;
                item_limit = base_limit;
                skip_limit = base_skip;
                queryParams = [];
                filters = [];
                if (req.query.id) {
                    if (Array.isArray(req.query.id)) {
                        placeholders = req.query.id.map(function (id) { return '?'; }).join(',');
                        filters.push("items.id IN (".concat(placeholders, ")"));
                        queryParams.push.apply(queryParams, req.query.id);
                    }
                    else {
                        filters.push("items.id = ?");
                        queryParams.push(req.query.id);
                    }
                }
                if (req.query.name) {
                    filters.push("items.name LIKE ?");
                    queryParams.push("%".concat(req.query.name, "%"));
                }
                if (req.query.setId) {
                    filters.push("items.setId = ?");
                    queryParams.push(req.query.setId);
                }
                if (req.query.minLevel) {
                    filters.push("items.level >= ?");
                    queryParams.push(req.query.minLevel);
                }
                if (req.query.maxLevel) {
                    filters.push("items.level <= ?");
                    queryParams.push(req.query.maxLevel);
                }
                if (req.query.effect) {
                    effects = Array.isArray(req.query.effect) ? req.query.effect : [req.query.effect];
                    effects.forEach(function (effect) {
                        filters.push("items.name IN (\n                SELECT DISTINCT\n                items.name\n                FROM\n                items\n                LEFT JOIN\n                characteristics ON items.itemCharacteristics = characteristics.characteristic_id\n                WHERE\n                characteristics.characteristic_id LIKE ?\n                AND items.weaponDmgFrom > 0\n                )");
                        queryParams.push(effect);
                    });
                }
                if (req.query.category) {
                    categories = Array.isArray(req.query.category) ? req.query.category : [req.query.category];
                    categoryFilters = categories.map(function () { return "items.type like ?"; }).join(' OR ');
                    filters.push("(".concat(categoryFilters, ")"));
                    categories.forEach(function (category) {
                        queryParams.push(category);
                    });
                }
                if (filters.length > 0) {
                    itemQuery += " WHERE ".concat(filters.join(' AND '));
                }
                if (req.query.limit) {
                    base_limit = Number(req.query.limit);
                }
                if (req.query.skip) {
                    base_skip = Number(req.query.skip);
                }
                groupedData = [];
                item_limit = base_limit;
                skip_limit = base_skip;
                element_to_icon = {
                    'Neutre': 'https://dofusdb.fr/icons/characteristics/tx_neutral.png',
                    'Feu': 'https://dofusdb.fr/icons/characteristics/tx_intelligence.png',
                    'Eau': 'https://dofusdb.fr/icons/characteristics/tx_chance.png',
                    'Terre': 'https://dofusdb.fr/icons/characteristics/tx_strength.png',
                    'Air': 'https://dofusdb.fr/icons/characteristics/tx_agility.png'
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], _ = _a[1];
                results.forEach(function (result, index) {
                    if (index >= base_limit) {
                        return;
                    }
                    try {
                        if (result.characId == -1) {
                            for (var element in element_to_icon) {
                                if (result.effectDescription.includes(element)) {
                                    result.characImg = element_to_icon[element];
                                    break;
                                }
                            }
                        }
                        var existingItem = groupedData.find(function (item) { return item.itemName === result.itemName; });
                        if (result.effectDescription !== null) {
                            result.effectDescription = result.effectDescription.split('2')[2];
                            if (result.effectDescription !== undefined) {
                                if (result.effectDescription.includes('{~ps}{~zs}')) {
                                    result.effectDescription = "".concat(result.effectDescription.split('{')[0], " ").concat(result.effectDescription.split('}')[2]);
                                }
                            }
                        }
                        if (!existingItem) {
                            existingItem = { itemName: result.itemName, itemId: result.itemId, description: result.itemDescription, level: result.level, type: result.type, img: result.img, imgHighRes: result.imgHighRes, apCost: result.apCost, minRange: result.minRange, maxRange: result.maxRange, nmbCast: result.nmbCast, criticalHitProbability: result.criticalHitProbability, setName: result.setName, setID: result.setId, characteristics: [] };
                            groupedData.push(existingItem);
                        }
                        else {
                            base_limit += 1;
                        }
                        existingItem.characteristics.push({ characName: result.effectDescription, characFrom: result.characFrom, characTo: result.characTo, characImg: result.characImg, characId: result.characId, effectId: result.effectId });
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error fetching items: ".concat(error_1));
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4:
                res.json({ limit: item_limit, skip: skip_limit, data: groupedData.slice(base_skip, base_limit) });
                return [2 /*return*/];
        }
    });
}); });
app.get('/jobs', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemQuery, queryParams, _a, results, _, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                itemQuery = "SELECT * from jobs";
                queryParams = [];
                if (req.query.id) {
                    itemQuery += " WHERE jobs.jobId = ?";
                    queryParams.push(req.query.id);
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], _ = _a[1];
                res.json({ data: results });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error("Error fetching jobs: ".concat(error_2));
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/items-type', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemQuery, queryParams, _a, results, _, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                itemQuery = "SELECT * from itemsType";
                queryParams = [];
                if (req.query.category) {
                    itemQuery += " WHERE itemstype.name LIKE ?";
                    queryParams.push("%".concat(req.query.category, "%"));
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], _ = _a[1];
                res.json({ data: results });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ error: "Internal Server Error" });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/recipes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemQuery, queryParams, groupedData, recipe, previousItemId, _a, results, fields, rows, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                itemQuery = "SELECT \n        recipes.resultId,\n        recipes.quantities,\n        recipes.ids,\n        recipes.jobId,\n        GROUP_CONCAT(items.name) AS itemName,\n        GROUP_CONCAT(items.img) AS itemImg,\n        GROUP_CONCAT(items.level) AS itemLevel,\n        items.id AS itemId \n    FROM \n        recipes \n    LEFT JOIN \n        items ON items.id = recipes.ids";
                queryParams = [];
                if (req.query.resultId) {
                    itemQuery += " WHERE recipes.resultId = ? ";
                    queryParams.push(req.query.resultId);
                }
                itemQuery += " GROUP BY \n            recipes.resultId, \n            recipes.quantities, \n            recipes.ids, \n            recipes.jobId \n        ORDER BY\n            recipes.quantities DESC ";
                groupedData = [];
                recipe = [];
                previousItemId = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], fields = _a[1];
                rows = results;
                if (rows.length > 0) {
                    previousItemId = rows[0].resultId;
                }
                results.forEach(function (result) {
                    try {
                        if (previousItemId != result.resultId) {
                            groupedData.push({ resultItemId: previousItemId, jobId: result.jobId, itemLevel: result.itemLevel, recipe: recipe });
                            previousItemId = result.resultId;
                            recipe = [];
                        }
                        recipe.push({ quantity: result.quantities, itemName: result.itemName, itemId: result.ids, itemImg: result.itemImg });
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
                try {
                    groupedData.push({ resultItemId: previousItemId, jobId: rows[rows.length - 1].jobId, itemLevel: rows[rows.length - 1].itemLevel, recipe: recipe });
                }
                catch (error) {
                    console.log("trying to access an item without characs: ".concat(error));
                }
                res.json({ data: groupedData });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error("Error fetching recipes: ".concat(error_4));
                res.status(500).json({ error: "Internal Server Error" });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/itemSets', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemQuery, queryParams, groupedData, charac, nmbItems, previousSetId, previousNmbItems, _a, results, fields, rows_1, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                itemQuery = "SELECT * from itemSets\n    join characteristics on itemSets.charac = characteristics.characteristic_id";
                queryParams = [];
                if (req.query.id) {
                    itemQuery += " WHERE itemSets.setId = ?";
                    queryParams.push(req.query.id);
                }
                groupedData = [];
                charac = [];
                nmbItems = [];
                previousSetId = 0;
                previousNmbItems = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], fields = _a[1];
                rows_1 = results;
                if (rows_1.length > 0) {
                    previousSetId = rows_1[0].setId;
                    previousNmbItems = rows_1[0].numberItem;
                }
                results.forEach(function (result, index) {
                    try {
                        if (previousNmbItems != result.numberItem || index == rows_1.length - 1) {
                            if (index == rows_1.length - 1) {
                                charac.push({ characName: result.name, characValue: result.characValue, characImg: result.img_url });
                                nmbItems.push({ characs: charac, nmbItems: previousNmbItems });
                            }
                            else {
                                nmbItems.push({ characs: charac, nmbItems: previousNmbItems });
                            }
                            previousNmbItems = result.numberItem;
                            charac = [];
                        }
                        if (previousSetId != result.setId) {
                            groupedData.push({ nmbItems: nmbItems, setName: result.setName, setId: result.setId, setLevel: result.setLevel });
                            previousSetId = result.setId;
                            nmbItems = [];
                        }
                        charac.push({ characName: result.name, characValue: result.characValue, characImg: result.img_url });
                    }
                    catch (error) {
                        console.error("error parsing set ".concat(error));
                    }
                });
                groupedData.push({ nmbItems: nmbItems, setName: rows_1[rows_1.length - 1].setName, setId: rows_1[rows_1.length - 1].setId, setLevel: rows_1[rows_1.length - 1].setLevel });
                res.json({ data: groupedData });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error("Error fetching sets: ".concat(error_5));
                res.status(500).json({ error: "Internal Server Error" });
                return [2 /*return*/];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); });
app.get('/mobs', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groupedData, mobCharac, base_limit, base_offset, previousMobID, itemQuery, queryParams, previousMobName, previousMobImg, ids, placeholders, limit, _a, results, fields, rows_2, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                groupedData = [];
                mobCharac = [];
                base_limit = 40;
                base_offset = 0;
                previousMobID = 0;
                itemQuery = "SELECT * from mobs";
                queryParams = [];
                previousMobName = "";
                previousMobImg = "";
                if (req.query.id) {
                    ids = [];
                    if (Array.isArray(req.query.id)) {
                        ids = req.query.id.map(Number);
                    }
                    else {
                        ids = [Number(req.query.id)];
                    }
                    placeholders = ids.map(function () { return '?'; }).join(',');
                    itemQuery += " WHERE id IN (".concat(placeholders, ")");
                    queryParams.push.apply(queryParams, ids);
                }
                if (req.query.name) {
                    itemQuery += " WHERE name LIKE ?";
                    queryParams.push("%".concat(req.query.name, "%"));
                }
                if (req.query.limit) {
                    base_limit = Number(req.query.limit);
                }
                if (req.query.offset) {
                    base_offset = Number(req.query.offset);
                }
                limit = base_limit;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], fields = _a[1];
                rows_2 = results;
                if (rows_2.length != 0) {
                    previousMobID = rows_2[0].id;
                    previousMobName = rows_2[0].name;
                    previousMobImg = rows_2[0].img;
                }
                results.forEach(function (result, index) {
                    if (index >= limit) {
                        return;
                    }
                    if (result.id != previousMobID || result.id == rows_2[rows_2.length - 1].id && result.lifePoints == rows_2[rows_2.length - 1].lifePoints) {
                        groupedData.push({ name: previousMobName, id: previousMobID.toString(), characs: mobCharac, img: previousMobImg });
                        previousMobID = result.id;
                        previousMobName = result.name;
                        previousMobImg = result.img;
                        mobCharac = [];
                        mobCharac.push({ level: result.level, lifePoints: result.lifePoints, ap: result.actionPoints, mp: result.mouvementPoints, vitality: result.vitality, paDodge: result.paDodge, pmDodge: result.pmDodge, wisdom: result.wisdom, earthResistance: result.earthResistance, fireResistance: result.fireResistance, airResistance: result.airResistance, waterResistance: result.waterResistance, neutralResistance: result.neutralResistance, strength: result.strength, intelligence: result.intelligence, chance: result.chance, agility: result.agility });
                    }
                    else {
                        limit += 1;
                        mobCharac.push({ level: result.level, lifePoints: result.lifePoints, ap: result.actionPoints, mp: result.mouvementPoints, vitality: result.vitality, paDodge: result.paDodge, pmDodge: result.pmDodge, wisdom: result.wisdom, earthResistance: result.earthResistance, fireResistance: result.fireResistance, airResistance: result.airResistance, waterResistance: result.waterResistance, neutralResistance: result.neutralResistance, strength: result.strength, intelligence: result.intelligence, chance: result.chance, agility: result.agility });
                    }
                });
                res.json({ limit: base_limit, total: rows_2.length, data: groupedData });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error("Error fetching mobs: ".concat(error_6));
                res.status(500).json({ error: "Internal Server Error" });
                return [2 /*return*/];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); });
app.get('/mobs-drop', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var previousMobId, drops, groupedData, itemQuery, queryParams, _a, results, _, rows, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                previousMobId = 0;
                drops = [];
                groupedData = [];
                itemQuery = "SELECT * from mobsDrop";
                queryParams = [];
                if (req.query.mobId) {
                    itemQuery += " WHERE mobId = ?";
                    queryParams.push(req.query.mobId);
                }
                ;
                if (req.query.dropId) {
                    itemQuery += " WHERE dropId = ?";
                    queryParams.push(req.query.dropId);
                }
                ;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query(itemQuery, queryParams)];
            case 2:
                _a = _b.sent(), results = _a[0], _ = _a[1];
                rows = results;
                if (rows.length != 0) {
                    previousMobId = rows[0].mobId;
                }
                ;
                results.forEach(function (mobDrop) {
                    if (mobDrop.mobId != previousMobId) {
                        groupedData.push({ mobId: previousMobId, dropsId: drops });
                        previousMobId = mobDrop.mobId;
                        drops = [];
                    }
                    else {
                        drops.push({ id: mobDrop.dropId, dropPourcentage: mobDrop.pourcentageDrop, criteria: Number(mobDrop.criteria) });
                    }
                });
                groupedData.push({ mobId: previousMobId, dropsId: drops });
                res.json({ data: groupedData });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _b.sent();
                console.error("Error fetching mobs drop: ".concat(error_7));
                res.status(500).json({ error: "Internal Server Error" });
                return [2 /*return*/];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
