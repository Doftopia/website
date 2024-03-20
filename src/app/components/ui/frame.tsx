import * as React from "react";

interface FrameProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  width?: string;
  height?: string;
}

const Frame: React.FC<FrameProps> = ({ children, size, width, height }) => {
  const defaultWidth =
    size === "sm" ? "19rem" : size === "md" ? "28rem" : "32rem";
  const defaultHeight = "18rem";

  const containerStyle: React.CSSProperties = {
    width: width || defaultWidth,
    height: height || defaultHeight,
  };

  return (
    <div className="flex flex-col bg-slate-600 m-2" style={containerStyle}>
      {children}
    </div>
  );
};

export default Frame;
