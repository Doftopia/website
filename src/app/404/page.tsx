import React from "react";
import Navbar from "../components/Navbar/Navbar";

const NotFound: React.FC = async () => {
  return (
    <>
      <main>
        <div className="grid w-fit mx-auto h-full text-center justify-center">
          <div className="text-white my-auto text-2xl">
            Oups , cette page n&apos;existe pas ou ne fait rien du tout !
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
