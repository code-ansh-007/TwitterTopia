import React from "react";
import Layout from "../components/Layout";
import { IoConstruct } from "react-icons/io5";

const Search = () => {
  return (
    <main className="flex flex-col items-center justify-center fixed inset-0">
      <div className="flex flex-col items-center gap-2 ">
        <IoConstruct size={100} className="text-neutral-300" />
        <span className="text-neutral-400">Under Development</span>
      </div>
    </main>
  );
};

export default Layout(Search);
