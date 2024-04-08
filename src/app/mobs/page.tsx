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
    const [nameFilter, setNameFilter] = useState<string>('')

    const fetchMobs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/mobs', {
                params: {
                    limit: 140,
                    name: nameFilter
                }
            });
            setMobs(response.data.data);
        } catch (error) {
            console.error(`Error fetching mobs ${error}`);
        }
    }

    const redirectMob = (mobId: string) => {
        router.push(`/mobs/mob?id=${mobId}`)
    }

    const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    }

    useEffect(() => {
        fetchMobs();
    }, [nameFilter])

    return (
        <div>
        <Navbar pageName="Home"/>

        <div className='bg-gray-800 h-full text-white pt-8'>
            <input type="text" name="Mobs" placeholder='Chercher monstres' className='text-black outline-none w-full h-8 mb-4' onChange={handleNameFilter}/>
            <div className='flex flex-wrap mx-6 gap-5'>
                {mobs.map((mob: GroupedMob) => (
                    <div className='flex flex-col items-center cursor-pointer w-44' onClick={() => redirectMob(mob.id)}>
                        <p className='bg-black px-1'>
                            {mob.name}
                        <p className='cursor-pointer'>
                        </p>
                            <div>
                                {mob.characs[0].level != mob.characs[mob.characs.length-1].level ? (
                                    <p>Niveau {mob.characs[0].level} a {mob.characs[mob.characs.length-1].level}</p>
                                ) : (
                                    <p>Niveau {mob.characs[0].level}</p>
                                )}
                            </div>
                        </p>
                            <img src={mob.img} alt={mob.name}/>
                        <br />
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default Page;