"use client";
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Drop, DropsByMob, GroupedItems, GroupedMob, MobCharac } from '@/app/interfaces';
import { set } from 'zod';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const mobId = searchParams.get('id');
    const [mob, setMob] = useState<GroupedMob[]>([]);
    const [drops, setDrops] = useState<GroupedItems[]>([]);
    const [dropPourcentage, setDropPourcentage] = useState<Drop[]>([]);
    const router = useRouter();
    const stats: string[] = ['ap', 'mp', 'lifePoints', 'paDodge', 'pmDodge', 'wisdom', 'strength', 'intelligence', 'chance', 'agility', 'earthResistance', 'airResistance', 'waterResistance', 'fireResistance', 'neutralResistance'];
    const stat_french_name: string[] = ['PA', 'PM', 'Vitalite', 'Esquive PA', 'Esquive PM', 'Sagesse', 'Force', 'Intelligence', 'Chance', 'Agilite', '% Terre', '% Air', '% Eau', '% Feu', '% Neutre'];
    const icons: string[] = ['actionPoints', 'movementPoints', 'vitality', 'dodgeAP', 'dodgeMP', 'wisdom', 'strength', 'intelligence', 'chance', 'agility', 'strength', 'agility', 'chance', 'intelligence', 'neutral']

    
    useEffect(() => {
        fetchMob(mobId!);
        fetchDropsFromMob(mobId!);
    }, [mobId])
    
    async function fetchMob(mobId: string) {
        try {
            const mobResponse = await axios.get(`http://localhost:3000/mobs?id=${mobId}`);
            setMob(mobResponse.data.data);
        } catch (error) {
            console.error(`Error fetching mob ${error}`);
        }
    }

    async function fetchDropsFromMob(mobId: string) {
        let filters = "";
        try {
            const dropsResponse = await axios.get(`http://localhost:3000/mobs-drop?mobId=${mobId}`);
            let drops = dropsResponse.data.data[0];
            const groupedDrops: GroupedItems[] = [];
            const groupedPourcentage: Drop[] = [];
            for (const drop of drops.dropsId) {
                filters += `id=${drop.id}&`;
                groupedPourcentage.push({dropPourcentage: drop.dropPourcentage, criteria: drop.criteria, id: drop.id});
            }
            const itemResponse = await axios.get(`http://localhost:3000/items?${filters}`);
            setDrops(itemResponse.data.data);
            setDropPourcentage(groupedPourcentage);
        } catch (error) {
            console.error(`Error fetching drops ${error}`);
        }
    };

    return (
        <div>
            <header>
                <Navbar pageName="Home"/>
            </header>
        <div className='bg-[#cfc4ab] h-screen text-white pt-24 mx-24'>
        {mob.map((mob: GroupedMob) => (
                    <div className='border-black border rounded-sm text-sm pl-4 pt-2'>
                        <p>
                            {mob.name}
                            <img src={mob.img} alt={mob.name} />
                        </p>
                        <div>
                                {mob.characs[0].level != mob.characs[mob.characs.length-1].level ? (
                                    <p>Niveau {mob.characs[0].level} a {mob.characs[mob.characs.length-1].level}</p>
                                ) : (
                                    <p>Niveau {mob.characs[0].level}</p>
                                )}
                            </div>
                        {stats.map((stat: string, index: number) => (
                            <div>
                                <p className={mob.characs[0][stat] < 0 || mob.characs[mob.characs.length-1][stat] < 0 ? "text-red-500" : "text-sm"}> 
                                {mob.characs[0][stat] != mob.characs[mob.characs.length-1][stat] ? (
                                    <div className='flex items-center'>
                                        <img src={`https://dofusdb.fr/icons/characteristics/tx_${icons[index]}.png`} alt={stat} className='mr-1'/>
                                        <p>{mob.characs[0][stat]} à {mob.characs[mob.characs.length-1][stat]} {stat_french_name[index]}</p>
                                    </div>
                                ) : (
                                    <div className='flex items-center'>
                                        <img src={`https://dofusdb.fr/icons/characteristics/tx_${icons[index]}.png`} alt={stat} className='mr-1'/>
                                        <p>{mob.characs[0][stat]} {stat_french_name[index]}</p>
                                    </div>
                                )}
                                </p>
                            </div>
                        ))}
                        <br />
                    </div>
                ))}
            <div>
                {drops[0] && dropPourcentage[0] && (
                    <div>
                        <p>Butins</p>
                        <div className= 'flex flex-wrap border-t border-black pt-4'>
                            {drops.map((drop: GroupedItems, index: number)=> (
                                <div>
                                    {dropPourcentage[index].criteria == 0 && (
                                        <div className='flex items-center hover:bg-[#779643]' onClick={() => router.push(`/items/item?id=${drop.itemId}`)}>
                                            <img src={drop.img} alt={drop.itemName} className='mr-1' />
                                            <p>{drop.itemName} - lvl {drop.level} {dropPourcentage[index].dropPourcentage}%</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p>Butins conditionnés </p>
                        <div className= 'flex flex-wrap border-t border-black pt-4'>
                            {drops.map((drop: GroupedItems, index: number)=> (
                                <div>
                                    {dropPourcentage[index].criteria == 1 && (
                                        <div className='flex items-center hover:bg-[#779643]' onClick={() => router.push(`/items/item?id=${drop.itemId}`)}>
                                            <img src={drop.img} alt={drop.itemName} className='mr-1' />
                                            <p>{drop.itemName} - lvl {drop.level} {dropPourcentage[index].dropPourcentage}%</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}

export default Page;