import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoaderProps {
  color?: string | "blue-500";
  size?: number | 24;
}

const Loader = ({ color, size }: LoaderProps) => {
  return (
    <>
      <AiOutlineLoading3Quarters
        size={size}
        className={`animate-spin text-${color?.toString()}`}
      />
    </>
  );
};

export default Loader;
