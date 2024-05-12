import Navbar from "@/app/components/Navbar/Navbar";
import XpCalculator from "@/app/components/Elements/XpCalculator/XpCalculator";
import Filters from "@/app/components/Elements/Filters";
import * as React from "react";

const page: React.FC = () => {
  return (
    <>
      <header>
        <Navbar pageName="xp-métiers" />
      </header>
      <div>
        <XpCalculator />
      </div>
    </>
  );
};

export default page;
