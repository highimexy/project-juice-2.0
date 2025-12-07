import "./BasicTile.css";
import React from "react";

export const BasicTile = ({
  children,
  bgcolor,
  className,
}: {
  bgcolor?: string;
  children: React.ReactNode;
  className?: string
}) => {
  return (
    <div
      className={`${bgcolor ? bgcolor : "bg-[#111010] "} 
      h-full w-auto
              card m-auto duration-300 ${className}`}
    >
      <div className="data">{children}</div>
    </div>
  );
};
