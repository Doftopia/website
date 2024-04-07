"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar/Navbar';
import { GroupedMob } from '../interfaces';

const Page: React.FC = () => {
    const [mobs, setMobs] = useState<any[]>([]);
    const stats: string[] = ['ap', 'mp', 'lifePoints', 'paDodge', 'pmDodge', 'wisdom', 'strength', 'intelligence', 'chance', 'agility', 'earthResistance', 'airResistance', 'waterResistance', 'fireResistance', 'neutralResistance'];
    const stat_french_name: string[] = ['PA', 'PM', 'Vitalite', 'Esquive PA', 'Esquive PM', 'Sagesse', 'Force', 'Intelligence', 'Chance', 'Agilite', '% Terre', '% Air', '% Eau', '% Feu', '% Neutre'];
    const icons: string[] = ['actionPoints', 'movementPoints', 'vitality', 'dodgeAP', 'dodgeMP', 'wisdom', 'strength', 'intelligence', 'chance', 'agility', 'strength', 'agility', 'chance', 'intelligence', 'neutral']
    const router = useRouter();

    const fetchMobs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/mobs');
            setMobs(response.data.data);
        } catch (error) {
            console.error(`Error fetching mobs ${error}`);
        }
    }

    const redirectMob = (mobId: string) => {
        router.push(`/mobs/mob?id=${mobId}`)
    }

    useEffect(() => {
        fetchMobs();
    }, [])

    return (
        <div>
        <Navbar pageName="Home"/>

        <div className='bg-gray-800 h-full text-white pt-20'>
            <div className='grid-cols-2 grid mx-6 pt-6 gap-3 pb-6'>
                {mobs.map((mob: GroupedMob) => (
                    <div className='border-black border rounded-sm text-sm bg-gray-900 pl-4 pt-2'>
                        <p className='cursor-pointer' onClick={() => redirectMob(mob.id)}>
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
            </div>
        </div>
        </div>
    )
}

export default Page;