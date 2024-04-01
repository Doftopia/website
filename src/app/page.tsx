const Page: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white h-screen flex justify-center items-center text-3xl flex-col">
            <h1>HomePage</h1>
            <a href="/items" className="border-b-2 border-black">go to items</a>
            <a href="/mobs" className="border-b-2 border-black">go to mobs</a>
        </div>
    )
};

export default Page;