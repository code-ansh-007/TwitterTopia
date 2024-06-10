import React, { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import useHomeTabStore from "../utils/homtTabStore";

const MobileNavbar = () => {
  const { selectTab, selectedTab } = useHomeTabStore();
  //  !!!!!!!!
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const navigate = useNavigate();
  return (
    <main className="flex flex-col mb-2 p-4 md:max-w-[41vw] md:pt-0 items-center gap-7 border-b-[1px] border-neutral-300 pb-0 sticky top-0 bg-white">
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
          <div className="w-8 h-8 relative">
            <img
              src={
                user?.profileImageUrl
                  ? user?.profileImageUrl
                  : "/placeholder.png"
              }
              className="w-full h-full object-cover object-center rounded-full md:hidden"
              alt="tweetopia logo"
            />
          </div>
        </div>
        <span className="font-playball font-bold text-2xl text-blue-400 md:hidden">
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
          onClick={() => selectTab("for-you")}
        >
          For You
        </span>
        <span
          className={`${
            selectedTab === "following"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          }`}
          onClick={() => {
            if (!user) {
              navigate("/user/signin");
              return;
            }
            selectTab("following");
          }}
        >
          Following
        </span>
        <span
          className={`${
            selectedTab === "discover"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          } `}
          onClick={() => {
            if (!user) {
              navigate("/user/signin");
              return;
            }
            selectTab("discover");
          }}
        >
          Your Posts
        </span>
      </div>
      {/* <Loader /> */}
    </main>
  );
};

export default MobileNavbar;
