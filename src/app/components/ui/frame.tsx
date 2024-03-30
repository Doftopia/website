import * as React from "react";

interface FrameProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  width?: string;
  height?: string;
  className?: string;
}

const Frame: React.FC<FrameProps> = ({
  children,
  size,
  width,
  height,
  className,
}) => {
  const defaultWidth =
    size === "sm" ? "19rem" : size === "md" ? "28rem" : "32rem";
  const defaultHeight = "18rem";

  const containerStyle: React.CSSProperties = {
    width: width || defaultWidth,
    height: height || defaultHeight,
  };

  return (
    <div
      className={`flex flex-col dark:bg-[#131312] border border-black shadow-lg dark:bg-opacity-70 m-2 ${className}`}
      style={containerStyle}
    >
      {children}
    </div>
  );
};

export default Frame;
