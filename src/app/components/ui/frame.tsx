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
  const defaultHeight = "8rem";

  const containerStyle: React.CSSProperties = {
    width: width || defaultWidth,
    height: height || defaultHeight,
  };

  return (
    <div
      className={`flex flex-col dark:bg-dark-3 dark:bg-opacity-60 m-2 ${className}`}
      style={containerStyle}
    >
      {children}
    </div>
  );
};

export default Frame;
