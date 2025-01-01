import React from "react";

const BreadCrumbs = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <div >{icon}</div>

      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default BreadCrumbs;
