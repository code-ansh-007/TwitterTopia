import React from "react";
import Layout from "../components/Layout";
import { IoMailUnreadSharp } from "react-icons/io5";

const Notifications = () => {
  return (
    <main className="flex flex-col items-center justify-center fixed inset-0">
      <div className="flex flex-col items-center gap-2 ">
        <IoMailUnreadSharp size={100} className="text-neutral-300" />
        <span className="text-neutral-400">No Notifications</span>
      </div>
    </main>
  );
};

export default Layout(Notifications);
