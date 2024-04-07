"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar/Navbar";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { ButtonProps } from "../components/ui/Button";
import { Category, Characteristic, GroupedItems } from "../interfaces";
import mysql from "mysql2/promise";


const Page: React.FC = () => {
    let limit = 50;
    const [items, setItems] = useState<GroupedItems[]>([]);
    const [nameFilter, setNameFilter] = useState<string>(); 
    const [minLvl, setminLvl] = useState<string>(); 
    const [maxLvl, setmaxLvl] = useState<string>(); 
    const router = useRouter();
    const [effectFilter, setEffectFilter] = useState<string[]>([]);
    const [categoriesFilter, setcategoriesFilter] = useState<string>();
    const [category, setCategory] = useState<string[]>([]); 
    const [categories, setCategories] = useState<Category[]>([]);

    const redirectItem = (itemId: string) => {
        router.push(`/items/item?id=${itemId}`);
    }

    const redirectSet = (setId: string) => {
        router.push(`/set?id=${setId}`);
    }

    const fetchItems = async () => {
        try {
            const responseItems = await axios.get(`http://localhost:3000/items`, {
                params: {
                    name: nameFilter,
                    effect: effectFilter,
                    minLevel: minLvl,
                    maxLevel: maxLvl,
                    category: category,
                    limit: limit,
                },
            });
            setItems(responseItems.data.data); 
        } catch (error) {
            console.log("Error fetching items:", error);
        }
    }

    const fetchCategories = async () => {
        try {
            const responseCategories = await axios.get(`http://localhost:3000/items-type`, {
                params: {
                    category: categoriesFilter,
                }
            });
            setCategories(responseCategories.data.data)
        } catch (error) {
            console.error(`Error fetching catories ${error}`);
        }
    }

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, [nameFilter, effectFilter, minLvl, maxLvl, category, categoriesFilter]); 

    const fetchMoreItems = async () => {
        try {
            const responseItems = await axios.get(`http://localhost:3000/items`, {
                params: {
                    name: nameFilter,
                    effect: effectFilter,
                    minLevel: minLvl,
                    maxLevel: maxLvl,
                    category: category,
                    limit: limit + 50, 
                },
            });
            setItems([...responseItems.data.data]); 
        } catch (error) {
            console.log("Error fetching more items:", error);
        }
    }

    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (scrollPercentage > 80) {
            fetchMoreItems();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [items]);

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

    const handleMinLevelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setminLvl(event.target.value);
    };

    const handleMaxLevelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmaxLvl(event.target.value);
    };

    const cateorgyNameFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setcategoriesFilter(event.target.value);
    };

    const filterEffect = (effect: number) => {
        const button = document.getElementById(effect.toString());
        if (effectFilter.includes(effect.toString())) {
            setEffectFilter(effectFilter.filter(item => item !== effect.toString()));
            button!.style.fontWeight = 'normal';
            button!.style.color = 'white';
        } else {
            button!.style.fontWeight = 'bolder';
            button!.style.color = 'rgb(119, 150, 67)';
            setEffectFilter([...effectFilter, effect.toString()]);
        }
    }

    const clearFilterEffect = () => {
        setEffectFilter([]);
        setNameFilter('');
        setminLvl('');
        setmaxLvl('');
        setCategory([]);
        const buttons = document.querySelectorAll('.filter-button');
        const categories = document.querySelectorAll('.categories');
        categories.forEach((category: any) => {
            category.style.color = '';
            category.style.fontWeight = '';
        });
        buttons.forEach((button: any) => {
            button.style.color = '';
            button.style.fontWeight = '';
        });
    }

    const filterCategoriesDiv = () => {
        const categoriesDiv = document.getElementById('categoriesFilter');
        if (categoriesDiv?.style.display != 'block') {
            categoriesDiv!.style.display = 'block';
        } else {
            categoriesDiv!.style.display = 'none';
        }
    }

    const filterCategory = (categoryName: string) => {
        const categoryDiv = document.getElementById(categoryName);
        if (category.includes(categoryName)) {
            categoryDiv!.style.color = '';
            categoryDiv!.style.fontWeight = '';
            setCategory(category.filter(item => item !== categoryName));
        } else {
            categoryDiv!.style.fontWeight = 'bold';
            categoryDiv!.style.color = 'rgb(119, 150, 67)';
            setCategory([...category, categoryName]);
        }
    }

    return (
        <div>
        <Navbar pageName="Home"/>
        <div className="min-h-screen flex bg-[#E0CBA8] pt-24">
            <div className="flex w-3/12 h-fit py-3 px-4 mx-8 text-black flex-col fixed text-sm transition-all border border-white rounded-lg">
                <input type="text" value={nameFilter} onChange={handleNameInputChange} placeholder="Rechercher" className="rounded-lg w-13 h-9 mt-1 outline-none pl-3  text-black"/>
                <div className="w-full flex justify-center gap-2 mt-1">
                    <input type="text" value={minLvl} onChange={handleMinLevelInputChange} placeholder="Niveau min" className="rounded-lg w-full h-9 mt-1 outline-none pl-3  text-black"/>
                    <input type="text" value={maxLvl} onChange={handleMaxLevelInputChange} placeholder="Niveau max" className="rounded-lg w-full h-9 mt-1 outline-none pl-3  text-black"/>
                </div>
                <div className="flex items-center">
                    <img src="/bin.svg" onClick={() => clearFilterEffect()} id='ResetFilters' className="hover:font-bold mt-3 size-5 cursor-pointer mb-2 mr-4"/>
                    <div className="flex bg-white w-full h-6 items-center" onClick={() => filterCategoriesDiv()}>
                        <img src="\down-arrow.svg" alt="non" className="size-5 ml-2"/>
                        <button className="w-full mr-2">
                            <p>Categories</p>
                        </button>
                    </div>
                </div>
                <div className="text-black border-white border rounded-sm hidden overflow-visible" style={{ maxHeight: "78vh", overflowY: "auto" }} id="categoriesFilter">
                    {(categories as Category[]).map((category: Category) => (
                        <div className="cursor-pointer hover:font-bold w-full pl-3 hover:bg-[#779643] categories" id={category.name} onClick={() => filterCategory(category.name)}>
                            {category.name}
                        </div>
                    ))}
                </div>
                <div className="flex mt-3 w-full justify-between gap-2">
                    <div className=" pl-2 py-1 w-full pb-2 mb-2">
                        <p className="mb-2 mt-1 font-bold">Primaires</p>
                        <button onClick={() => filterEffect(1)} id='1' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_actionPoints.png" alt="lifePoints" className="size-5 mr-1"></img>
                            PA</button>
                        <button onClick={() => filterEffect(23)} id="23" className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_movementPoints.png" alt="lifePoints" className="size-5 mr-1"></img>
                            PM
                        </button>
                        <button onClick={() => filterEffect(19)} id="19" className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_range.png" alt="lifePoints" className="size-5 mr-1"></img>
                            PO</button>
                        <button onClick={() => filterEffect(11)} id="11" className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_vitality.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Vitalite</button>
                        <button onClick={() => filterEffect(14)} id='14' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Agilite</button>
                        <button onClick={() => filterEffect(13)} id='13' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Chance</button>
                        <button onClick={() => filterEffect(10)} id='10' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Force</button>
                        <button onClick={() => filterEffect(15)} id='15' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Intelligence</button>
                        <button onClick={() => filterEffect(25)} id='25' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_damagesPercent.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Puissance</button>
                        <button onClick={() => filterEffect(18)} id='18' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_crit.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Critique</button>
                        <button onClick={() => filterEffect(12)} id='12' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_wisdom.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Sagesse</button>
                    </div>
                    <div className="  pl-2 py-1 w-full pb-2 mb-2">
                        <p className="mb-2 mt-1 font-bold">Secondaires</p>
                        <button onClick={() => filterEffect(82)} id='82' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_attackAP.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Retrait PA</button>
                        <button onClick={() => filterEffect(27)} id='27' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_dodgeAP.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Esquive PA</button>
                        <button onClick={() => filterEffect(83)} id='83' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_attackMP.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Retrait PM</button>
                        <button onClick={() => filterEffect(28)} id='28' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_dodgeMP.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Retrait PA</button>
                        <button onClick={() => filterEffect(49)} id='49' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_heal.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Soins</button>
                        <button onClick={() => filterEffect(79)} id='79' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_tackle.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Tacle</button>
                        <button onClick={() => filterEffect(78)} id='78' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_escape.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Fuite</button>
                        <button onClick={() => filterEffect(44)} id='44' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_initiative.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Initiative</button>
                        <button onClick={() => filterEffect(26)} id='26' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_summonableCreaturesBoost.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Invocation</button>
                        <button onClick={() => filterEffect(48)} id='48' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_prospecting.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Prospection</button>
                        <button onClick={() => filterEffect(40)} id='40' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_pods.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Pods</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 pt-2 w-full gap-2">
                    <div className="  w-full pl-2 py-1 pb-2 mb-2">
                        <p className="mb-2 mt-1 font-bold">Dommages</p>
                        <button onClick={() => filterEffect(16)} id='16' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_damage.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dommages</button>
                        <button onClick={() => filterEffect(86)} id='86' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_criticalDamage.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dommages critiques</button>
                        <button onClick={() => filterEffect(92)} id='92' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_neutral.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dmg Neutre</button>
                        <button onClick={() => filterEffect(88)} id='88' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dmg Terre</button>
                        <button onClick={() => filterEffect(89)} id='89' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dmg Feu</button>
                        <button onClick={() => filterEffect(90)} id='90' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dmg Eau</button>
                        <button onClick={() => filterEffect(91)} id='91' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Dmg Air</button>
                    </div>
                    <div className="  w-full pl-2 py-1 pb-2 mb-2">
                    <p className="mb-2 mt-1 font-bold">Resistances</p>
                        <button onClick={() => filterEffect(58)} id='58' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_neutral.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Neutre (fixe)</button>
                        <button onClick={() => filterEffect(37)} id='37' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_neutral.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Neutre (%)</button>
                        <button onClick={() => filterEffect(54)} id='54' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Terre (fixe)</button>
                        <button onClick={() => filterEffect(33)} id='33' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_strength.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Terre (%)</button>
                        <button onClick={() => filterEffect(55)} id='55' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Feu (fixe)</button>
                        <button onClick={() => filterEffect(34)} id='34' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Feu (%)</button>
                        <button onClick={() => filterEffect(56)} id='56' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Eau (fixe)</button>
                        <button onClick={() => filterEffect(35)} id='35' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_chance.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Eau (%)</button>
                        <button onClick={() => filterEffect(57)} id='57' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Air (fixe)</button>
                        <button onClick={() => filterEffect(36)} id='36' className="filter-button flex hover:font-bold hover:bg-[#779643] w-full">
                            <img src="https://dofusdb.fr/icons/characteristics/tx_agility.png" alt="lifePoints" className="size-5 mr-1"></img>
                            Air (%)</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-full">
            <div className="grid gap-3 mx-4 grid-cols-4">
              {(items as GroupedItems[]).map((item: GroupedItems, index: number) => (
                <div key={index} className=" text-black px-3 rounded-lg flex flex-col bg-white pb-4">
                <div className="flex justify-between pt-3 w-72">
                  <div className="flex flex-col transition-all">
                    <h2 className="font-bold cursor-pointer hover:text-[#779643]" onClick={() => redirectItem(item.itemId.toString())}>{item.itemName}</h2>
                    <h3 className="text-sm text-gray-500">{item.type} - niveau {item.level}</h3>
                    <h3 className="text-sm mb-5 bg-[#779643 cursor-pointer hover:text-[#779643] text-gray-500" onClick={() => redirectSet(item.setID.toString())}>{item.setName}</h3>
                  </div>
                  <img src={item.img} alt={item.itemName} draggable='false' className="p-1 size-16 rounded-sm"/>
                </div>                  
                <div>
                {item.characteristics[0].characId == -1 && (
                <div></div>
             )}
                          {item.apCost && (
    <>
            <div className="text-sm mb-1">
                <p className="flex"><p className="text-gray-500 mr-1">Coût </p>{item.apCost} PA</p>
                {item.minRange !== item.maxRange ? (
                    <p className="flex"><p className="text-gray-500 mr-1">Portée </p>{item.minRange}-{item.maxRange}</p>
                ) : (
                    <p className="flex"><p className="text-gray-500 mr-1">Portée </p>{item.maxRange}</p>
                )}
                <p className="flex"><p className="text-gray-500 mr-1">Utilisation par tour </p>{item.nmbCast}</p>
                <p className="flex"><p className="text-gray-500 mr-1">Critique </p>{item.criticalHitProbability}%</p>
            </div>
    </>
)}
           {item.characteristics[0].characId == -1 && (
                <div className='mt-4'></div>
             )}
                {item.characteristics.map((charac: Characteristic) => (
                <div>
                    {charac.characId < 0 && (
                        <div>
                            <div className="flex text-sm">
                                {charac.effectId == 101 ? (
                                    <div className="flex text-sm items-center">
                                        <img src="https://dofusdb.fr/icons/characteristics/tx_actionPoints.png" className="size-5 mr-2" alt="PA" />
                                        <p>-1 pa</p>
                                    </div>
                                ) : (
                                    <div className="flex text-sm">
                                        <img src={charac.characImg} alt='x' className="mr-2 size-5" draggable='false'/>
                                        <p>{charac.characFrom} à {charac.characTo} {charac.characName}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
             ))}

             {item.characteristics[0].characId == -1 && (
                <div className='mb-3'></div>
             )}
             {item.characteristics.map((charac: Characteristic, idx: number) => (
                                <div key={idx} className="flex">
                                    {charac.characId >= 0 && (
                                            <p className={charac.characFrom < 0 || charac.characTo < 0 ? "text-red-500 text-sm" : "text-sm"}> 
                                                {charac.characTo ? (
                                                    <>
                                                        <div>
                                                            {charac.characFrom === null ? (
                                                                <div className="flex">
                                                                    <img src={charac.characImg} alt='x' className="mr-2 size-5" draggable='false'/>
                                                                    <p>{charac.characTo} {charac.characName}</p>
                                                                </div>
                                                            ) : (
                                                                <div className="flex">
                                                                    {charac.effectId != 983 && (
                                                                        <div className="flex">
                                                                            <img src={charac.characImg} alt='x' className="mr-2 size-5" draggable='false'/>
                                                                            <p>{charac.characFrom} à {charac.characTo} {charac.characName}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                    {charac.effectId !== null && (
                                                        <div className="flex">
                                                            {charac.effectId == 110 || charac.effectId == 139 ? (
                                                                <>
                                                                <div className="flex text-sm">
                                                                    <p>rend {charac.characFrom} {charac.characName}</p>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="flex text-sm">
                                                                    {charac.effectId == 795 ? (
                                                                        <p className=" text-orange-400">Arme de chasse</p>
                                                                    ) : (
                                                                        <div className="flex text-sm">
                                                                            {charac.effectId != 984 && charac.effectId != 981 && charac.effectId != 826 && charac.effectId != 600 && charac.effectId != 193 && charac.effectId != 206 && charac.effectId != 1155 &&  charac.effectId != 149 && charac.effectId != 732 &&  charac.effectId != 649 && charac.effectId != 731 && charac.effectId != 760 && charac.effectId != 146 && charac.effectId != 811 && charac.effectId != 724 && charac.effectId != 705 && charac.effectId != 623 && charac.effectId != 2818 && charac.effectId != 620 && charac.effectId != 30 && (
                                                                                <div className="flex">
                                                                                    <img src={charac.characImg} alt='x' className="mr-2 size-5" draggable='false'/>
                                                                                    <p>{charac.characFrom} {charac.characName}</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    </>
                                                )}
                                            </p>
                                    )}
                                </div>
                            ))}
                    </div>

                  </div>
              ))}
              </div>
            </div>
        </div>
        </div>

    );
};

export default Page;
