import { Characteristic, GroupedItems } from "@/app/interfaces";
import { useRouter } from "next/navigation";

interface PageNameInterface {
    PageName: GroupedItems[];
};

const Item = ({ PageName }: PageNameInterface) => {
    const router = useRouter();
    const redirectItem = (itemId: string) => {
        router.push(`/items/item?id=${itemId}`);
    }

    const redirectSet = (setId: string) => {
        router.push(`/set?id=${setId}`);
    }
    const items = PageName;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:mx-8  box-border gap-3 xl:grid-cols-3 2xl:grid-cols-4">
        {(items as GroupedItems[]).map((item: GroupedItems, index: number) => (
          <div key={index} className="text-black px-3 flex flex-col bg-[#cfc4ab] pb-4 border-[#3eb167] border sm:w-full lg:w-auto box-border hover:-translate-y-2 transition-all cursor-pointer hover:brightness-90" onClick={() => redirectItem(item.itemId.toString())}>                
          <div className="flex justify-between pt-3 w-full">
            <div className="flex flex-col transition-all">
              <h2 className="font-bold cursor-pointer hover:text-[#779643]" onClick={() => redirectItem(item.itemId.toString())}>{item.itemName}</h2>
              <h3 className="text-sm text-[#796f5a]">{item.type} - niveau {item.level}</h3>
              <h3 className="text-sm mb-5 bg-[#779643 cursor-pointer hover:text-[#779643] text-gray-500" onClick={() => redirectSet(item.setID.toString())}>{item.setName}</h3>
            </div>
            <img src={item.imgHighRes} alt={item.itemName} draggable='false' className="p-1 size-20"/>
          </div>                  
          <div>
          {item.characteristics[0].characId == -1 && (
          <div></div>
       )}
                    {item.apCost && (
<>
      <div className="text-sm mb-1">
          <p className="flex"><p className="text-[#796f5a] mr-1">Coût </p>{item.apCost} PA</p>
          {item.minRange !== item.maxRange ? (
              <p className="flex"><p className="text-[#796f5a] mr-1">Portée </p>{item.minRange}-{item.maxRange}</p>
          ) : (
              <p className="flex"><p className="text-[#796f5a] mr-1">Portée </p>{item.maxRange}</p>
          )}
          <p className="flex"><p className="text-[#796f5a] mr-1">Utilisation par tour </p>{item.nmbCast}</p>
          <p className="flex"><p className="text-[#796f5a] mr-1">Critique </p>{item.criticalHitProbability}%</p>
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
                                      <p className={charac.characFrom < 0 || charac.characTo < 0 ? "text-red-500 text-sm" : "text-sm "}> 
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
    )
}

export default Item;