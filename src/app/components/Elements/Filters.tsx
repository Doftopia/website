/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Category, GroupedItems } from "../../interfaces";
import ItemList from "./Lists/ItemList";
import axios from "axios";

const Filters: React.FC = () => {
  const [limit, setLimit] = useState<number>(50);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<GroupedItems[]>([]);
  const [nameFilter, setNameFilter] = useState<string>();
  const [minLvl, setminLvl] = useState<string>();
  const [maxLvl, setmaxLvl] = useState<string>();
  const [effectFilter, setEffectFilter] = useState<string[]>([]);
  const [categoriesFilter, setcategoriesFilter] = useState<string>();
  const [category, setCategory] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const filterEffect = (effect: number) => {
    const button = document.getElementById(effect.toString());
    if (effectFilter.includes(effect.toString())) {
      setEffectFilter(
        effectFilter.filter((item) => item !== effect.toString())
      );
      button!.style.fontWeight = "";
      button!.style.color = "";
    } else {
      button!.style.fontWeight = "bolder";
      button!.style.color = "#3eb167";
      setEffectFilter([...effectFilter, effect.toString()]);
    }
  };

  const clearFilterEffect = () => {
    setEffectFilter([]);
    setNameFilter("");
    setminLvl("");
    setmaxLvl("");
    setCategory([]);
    const buttons = document.querySelectorAll(".filter-button");
    const categories = document.querySelectorAll(".categories");
    categories.forEach((category: any) => {
      category.style.color = "";
      category.style.fontWeight = "";
    });
    buttons.forEach((button: any) => {
      button.style.color = "";
      button.style.fontWeight = "";
    });
  };

  const filterCategoriesDiv = () => {
    const categoriesDiv = document.getElementById("categoriesFilter");
    if (categoriesDiv?.style.display != "block") {
      categoriesDiv!.style.display = "block";
    } else {
      categoriesDiv!.style.display = "none";
    }
  };
  const filterCategory = (categoryName: string) => {
    const categoryDiv = document.getElementById(categoryName);
    if (category.includes(categoryName)) {
      categoryDiv!.style.color = "";
      categoryDiv!.style.fontWeight = "";
      setCategory(category.filter((item) => item !== categoryName));
    } else {
      categoryDiv!.style.fontWeight = "bold";
      categoryDiv!.style.color = "rgb(236, 142, 2)";
      setCategory([...category, categoryName]);
    }
  };

  const fetchItems = async () => {
    try {
      const responseItems = await axios.get(`http://localhost:3001/items`, {
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
  };

  const fetchCategories = async () => {
    try {
      const responseCategories = await axios.get(
        `http://localhost:3001/items-type`,
        {
          params: {
            category: categoriesFilter,
          },
        }
      );
      setCategories(responseCategories.data.data);
    } catch (error) {
      console.error(`Error fetching catories ${error}`);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, [nameFilter, effectFilter, minLvl, maxLvl, category, categoriesFilter]);

  const handleMinLevelInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setminLvl(event.target.value);
  };

  const handleMaxLevelInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setmaxLvl(event.target.value);
  };

  const cateorgyNameFilterInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setcategoriesFilter(event.target.value);
  };

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  const fetchMoreItems = async () => {
    try {
      const responseItems = await axios.get(`http://localhost:3001/items`, {
        params: {
          name: nameFilter,
          effect: effectFilter,
          minLevel: minLvl,
          maxLevel: maxLvl,
          category: category,
          limit: limit,
          offset: offset + limit,
        },
      });
      setItems((prevItems) => [...prevItems, ...responseItems.data.data]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.log("Error fetching more items:", error);
    }
  };

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (scrollPercentage > 80) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  return (
    <>
      <div className="h-fit text-black dark:text-white lg:block top-24 text-sm transition-all bg-light-2 dark:bg-dark-3 rounded-sm border border-orange dark:border-blue mb-7 lg:sticky py-3 px-4  w-full lg:w-1/3">
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameInputChange}
          placeholder="Rechercher"
          className="rounded-lg w-13 h-9 mt-1 outline-none pl-3 text-black w-full"
        />
        <div className="w-full flex justify-center gap-2 mt-1">
          <input
            type="text"
            value={minLvl}
            onChange={handleMinLevelInputChange}
            placeholder="Niveau min"
            className="rounded-lg w-full h-9 mt-1 outline-none pl-3 text-black"
          />
          <input
            type="text"
            value={maxLvl}
            onChange={handleMaxLevelInputChange}
            placeholder="Niveau max"
            className="rounded-lg w-full h-9 mt-1 outline-none pl-3 text-black"
          />
        </div>
        <div className="flex">
          <div
            className="bg-white h-8 w-10 mt-2 rounded-lg cursor-pointer mr-2 flex items-center justify-center"
            onClick={() => clearFilterEffect()}
          >
            <img src="/bin.svg" id="ResetFilters" className="size-5" alt="" />
          </div>
          <div
            className="flex bg-white text-black rounded-lg w-full h-8 mt-2 items-center"
            onClick={() => filterCategoriesDiv()}
          >
            <img src="\down-arrow.svg" alt="non" className="size-4 ml-4" />
            <button className="w-full mr-2">
              <p>Categories</p>
            </button>
          </div>
        </div>
        <div
          className="text-black border-[#686459] border-2 rounded-sm mt-2 hidden overflow-visible bg-white"
          style={{ maxHeight: "78vh", overflowY: "auto" }}
          id="categoriesFilter"
        >
          {(categories as Category[]).map((category: Category) => (
            <div
              className="cursor-pointer hover:font-bold w-full pl-3 hover:bg-orange dark:hover:bg-green categories transition-all"
              id={category.name}
              onClick={() => filterCategory(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="flex mt-3 w-full justify-between gap-2 ">
          <div className=" pl-2 py-1 w-full pb-2 mb-2  rounded-sm">
            <p className="mb-2 mt-1 font-bold">Primaires</p>
            <button
              onClick={() => filterEffect(1)}
              id="1"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_actionPoints.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              PA
            </button>
            <button
              onClick={() => filterEffect(23)}
              id="23"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_movementPoints.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              PM
            </button>
            <button
              onClick={() => filterEffect(19)}
              id="19"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_range.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              PO
            </button>
            <button
              onClick={() => filterEffect(11)}
              id="11"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_vitality.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Vitalite
            </button>
            <button
              onClick={() => filterEffect(14)}
              id="14"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_agility.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Agilite
            </button>
            <button
              onClick={() => filterEffect(13)}
              id="13"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_chance.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Chance
            </button>
            <button
              onClick={() => filterEffect(10)}
              id="10"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_strength.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Force
            </button>
            <button
              onClick={() => filterEffect(15)}
              id="15"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Intelligence
            </button>
            <button
              onClick={() => filterEffect(25)}
              id="25"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_damagesPercent.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Puissance
            </button>
            <button
              onClick={() => filterEffect(18)}
              id="18"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_crit.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Critique
            </button>
            <button
              onClick={() => filterEffect(12)}
              id="12"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_wisdom.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Sagesse
            </button>
          </div>
          <div className="  pl-2 py-1 w-full pb-2 mb-2  rounded-sm">
            <p className="mb-2 mt-1 font-bold">Secondaires</p>
            <button
              onClick={() => filterEffect(82)}
              id="82"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_attackAP.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Retrait PA
            </button>
            <button
              onClick={() => filterEffect(27)}
              id="27"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_dodgeAP.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Esquive PA
            </button>
            <button
              onClick={() => filterEffect(83)}
              id="83"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_attackMP.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Retrait PM
            </button>
            <button
              onClick={() => filterEffect(28)}
              id="28"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_dodgeMP.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Retrait PA
            </button>
            <button
              onClick={() => filterEffect(49)}
              id="49"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_heal.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Soins
            </button>
            <button
              onClick={() => filterEffect(79)}
              id="79"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_tackle.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Tacle
            </button>
            <button
              onClick={() => filterEffect(78)}
              id="78"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_escape.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Fuite
            </button>
            <button
              onClick={() => filterEffect(44)}
              id="44"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_initiative.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Initiative
            </button>
            <button
              onClick={() => filterEffect(26)}
              id="26"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_summonableCreaturesBoost.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Invocation
            </button>
            <button
              onClick={() => filterEffect(48)}
              id="48"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_prospecting.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Prospection
            </button>
            <button
              onClick={() => filterEffect(40)}
              id="40"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_pods.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Pods
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-2 w-full gap-2">
          <div className="w-full pl-2 py-1 pb-2 mb-2  rounded-sm">
            <p className="mb-2 mt-1 font-bold">Dommages</p>
            <button
              onClick={() => filterEffect(16)}
              id="16"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_damage.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Dommages
            </button>
            <button
              onClick={() => filterEffect(86)}
              id="86"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_criticalDamage.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Do critiques
            </button>
            <button
              onClick={() => filterEffect(92)}
              id="92"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_neutral.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Dmg Neutre
            </button>
            <button
              onClick={() => filterEffect(88)}
              id="88"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_strength.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Dmg Terre
            </button>
            <button
              onClick={() => filterEffect(89)}
              id="89"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Dmg Feu
            </button>
            <button
              onClick={() => filterEffect(90)}
              id="90"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_chance.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Dmg Eau
            </button>
            <button
              onClick={() => filterEffect(91)}
              id="91"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_agility.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Dmg Air
            </button>
          </div>
          <div className="  w-full pl-2 py-1 pb-2 mb-2  rounded-sm">
            <p className="mb-2 mt-1 font-bold">Resistances</p>
            <button
              onClick={() => filterEffect(58)}
              id="58"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_neutral.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Neutre (fixe)
            </button>
            <button
              onClick={() => filterEffect(37)}
              id="37"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_neutral.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Neutre (%)
            </button>
            <button
              onClick={() => filterEffect(54)}
              id="54"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_strength.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Terre (fixe)
            </button>
            <button
              onClick={() => filterEffect(33)}
              id="33"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_strength.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Terre (%)
            </button>
            <button
              onClick={() => filterEffect(55)}
              id="55"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Feu (fixe)
            </button>
            <button
              onClick={() => filterEffect(34)}
              id="34"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_intelligence.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Feu (%)
            </button>
            <button
              onClick={() => filterEffect(56)}
              id="56"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_chance.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Eau (fixe)
            </button>
            <button
              onClick={() => filterEffect(35)}
              id="35"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_chance.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Eau (%)
            </button>
            <button
              onClick={() => filterEffect(57)}
              id="57"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_agility.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Air (fixe)
            </button>
            <button
              onClick={() => filterEffect(36)}
              id="36"
              className="filter-button flex hover:font-bold hover:bg-orange hover:text-white dark:hover:bg-green w-full"
            >
              <img
                src="https://dofusdb.fr/icons/characteristics/tx_agility.png"
                alt="lifePoints"
                className="size-5 mr-1"
              ></img>
              Air (%)
            </button>
          </div>
        </div>
      </div>
      <ItemList item={items}></ItemList>
    </>
  );
};

export default Filters;
