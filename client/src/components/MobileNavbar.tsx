import React, { useState } from "react";
import Loader from "./Loader";

const MobileNavbar = () => {
  const [selectedTab, setSelectedTab] = useState("for-you");
  return (
    <main className="flex flex-col p-4 items-center gap-7 border-b-[1px] border-neutral-300 pb-0">
      <div className="flex flex-row items-center w-full">
        <div className="w-[38%]">
          <img
            src="/placeholder.png"
            className="w-8 h-8"
            alt="tweetopia logo"
          />
        </div>
        <span className="font-playball font-bold text-2xl text-blue-400">
          TweeTopia
        </span>
      </div>
      <div className="w-full flex flex-row items-center justify-between ">
        <span
          className={`${
            selectedTab === "for-you"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          }`}
          onClick={() => setSelectedTab("for-you")}
        >
          For You
        </span>
        <span
          className={`${
            selectedTab === "following"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          }`}
          onClick={() => setSelectedTab("following")}
        >
          Following
        </span>
        <span
          className={`${
            selectedTab === "discover"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          } `}
          onClick={() => setSelectedTab("discover")}
        >
          Discover
        </span>
      </div>
      {/* <Loader /> */}
    </main>
  );
};

export default MobileNavbar;
