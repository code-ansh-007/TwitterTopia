import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FaFeather } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCreateModalStore from "../utils/zustandStore";

const MobileBottomNav = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const { openModal } = useCreateModalStore();
  const navigate = useNavigate();
  const user = localStorage.getItem("user:details");
  return (
    <main className="border-t-[1px] border-neutral-300 p-4 fixed w-full bottom-0 bg-white md:border-r-[1px] md:border-t-0 md:sticky md:top-0 md:h-screen md:w-fit">
      <div className="flex flex-row md:flex-col md:gap-5 md:items-start items-center justify-between">
        <div className="font-playball font-bold text-3xl text-blue-400 hidden md:block">
          TweeTopia
        </div>
        <div
          onClick={() => {
            navigate("/");
            setSelectedTab("home");
          }}
          className="flex flex-row items-end gap-2"
        >
          <GrHomeRounded
            size={28}
            color={selectedTab === "home" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold hidden md:block mb-[-4px] ${
              selectedTab === "home" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Home
          </span>
        </div>
        <div
          onClick={() => {
            navigate("/user/search");
            setSelectedTab("search");
          }}
          className="flex flex-row items-end gap-1"
        >
          <IoSearch
            size={32}
            color={selectedTab === "search" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold hidden md:block mb-[-4px] ${
              selectedTab === "search" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Search
          </span>
        </div>
        <div
          onClick={() => {
            if (!user) {
              navigate("/user/signin");
              return;
            }
            openModal();
            setSelectedTab("write");
          }}
          className="flex flex-row items-end gap-1"
        >
          <FaFeather
            size={30}
            // color={selectedTab === "write" ? "#313233" : "#7d8085"}
            className="text-blue-500 animate-pulse"
          />
          <span
            className={`font-semibold hidden md:block mb-[-4px] text-blue-500 animate-pulse`}
          >
            Create
          </span>
        </div>
        <div
          onClick={() => {
            const isLoggedIn = localStorage.getItem("user:token") !== null;
            if (!isLoggedIn) navigate("/user/signup");
            else {
              navigate("/user/notifications");
              setSelectedTab("mail");
            }
          }}
          className="flex flex-row items-end gap-1"
        >
          <MdMailOutline
            size={30}
            color={selectedTab === "mail" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold hidden md:block mb-[-1px] ${
              selectedTab === "mail" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Notifications
          </span>
        </div>
        <div
          onClick={() => {
            const isLoggedIn = localStorage.getItem("user:token") !== null;
            if (!isLoggedIn) navigate("/user/signup");
            else {
              navigate("/user/profile");
              setSelectedTab("profile");
            }
          }}
          className="flex flex-row items-end gap-2"
        >
          <FaRegUser
            size={27}
            color={selectedTab === "profile" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold hidden md:block mb-[-4px] ${
              selectedTab === "profile" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Profile
          </span>
        </div>
      </div>
    </main>
  );
};

export default MobileBottomNav;
