import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <>
      <AiOutlineLoading3Quarters
        size={24}
        className="animate-spin"
        color="#4287f5"
      />
    </>
  );
};

export default Loader;
