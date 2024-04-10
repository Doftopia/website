import Navbar from "../components/Navbar/Navbar"
import React from "react"

const Page: React.FC = () => {
    return (
    <div>
        <Navbar pageName="Ventes"/>
        <div className="w-full flex justify-around border border-black mt-4">
            <p>Prit d'achat</p>
            <p>Taxes</p>
            <p>Prit de vente</p>
            <p>Benef</p>
        </div>
    </div>
    );
}

export default Page