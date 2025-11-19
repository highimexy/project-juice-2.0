import "./BasicTile.css";
import React from "react";

export const BasicTile = ({
  children,
  bgcolor,
}: {
  bgcolor?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${bgcolor ? bgcolor : "bg-white "} 
      h-full w-auto max-w-4xl
              card m-auto duration-300 hover:cursor-pointer`}
    >
      <div className="data">{children}</div>
    </div>
  );
};
