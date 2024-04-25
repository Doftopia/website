/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import Navbar from "../components/Navbar/Navbar";
import FmTool from "../components/Elements/FmTool";

const Page: React.FC = () => {
  return (
    <div>
      <Navbar pageName="forgemagie" />
      <p>
        Disclaimer: Je n&pos;ai pas les vrais probas donc surement pas tres
        coherent.
      </p>
      <div className="mt-4 mx-8">
        <FmTool />
      </div>
    </div>
  );
};

export default Page;
