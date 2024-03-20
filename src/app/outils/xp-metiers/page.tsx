import Navbar from "@/app/components/Navbar/navbar";
import XpCalculator from "@/app/components/XpCalculator/XpCalculator";
import * as React from "react";

const page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <XpCalculator />
      </div>
    </>
  );
};

export default page;
