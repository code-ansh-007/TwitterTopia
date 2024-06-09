import React, { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const [selectedTab, setSelectedTab] = useState("for-you");
  //  !!!!!!!!
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const navigate = useNavigate();
  return (
    <main className="flex flex-col mb-2 p-4 items-center gap-7 border-b-[1px] border-neutral-300 pb-0 sticky top-0 bg-white">
      <div className="flex flex-row items-center w-full">
        <div
          className="w-[38%]"
          onClick={() => {
            if (!user) {
              navigate("/user/signin");
            } else {
              navigate("/user/profile");
            }
          }}
        >
          <img
            src={user ? user.profileImageUrl : "/placeholder.png"}
            className="w-8 h-8 rounded-full"
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
          Your Posts
        </span>
      </div>
      {/* <Loader /> */}
    </main>
  );
};

export default MobileNavbar;
