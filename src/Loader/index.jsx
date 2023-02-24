import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-[100%] min-h-screen min-w-max">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
