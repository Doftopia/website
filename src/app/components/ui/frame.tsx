import * as React from "react";

interface FrameProps {
  children: React.ReactNode;
}

const Frame: React.FC<FrameProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-600 sm:w-[19rem] md:w-[28rem] lg:w-[32rem] h-[18rem] m-2">
      {children}
    </div>
  );
};

export default Frame;
