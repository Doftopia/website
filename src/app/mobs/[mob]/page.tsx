"use client";
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const mobId = searchParams.get('id');
    const [mob, setMob] = useState<any[]>([]);
    
    useEffect(() => {
        fetchMob(mobId!);
    }, [mobId])
    
    async function fetchMob(mobId: string) {
        const mobResponse = await axios.get(`http://localhost:3000/mobs?id=${mobId}`);
        setMob(mobResponse.data.data);
    }

    return (
        <div>
            <header>
                <Navbar pageName="Home"/>
            </header>
            <div className='bg-gray-800 text-white h-screen pt-24'>
                {mob.map((mob: any) => (
                    <div>
                        {mob.name}
                        <img src={mob.img} alt={mob.name}/>
                        {mob.characs.map((charac: any) => (
                            <div>
                                {charac.lifePoints}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page;