import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FaFeather } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCreateModalStore from "../utils/zustandStore";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState<string>("home");
  const { openModal } = useCreateModalStore();
  const navigate = useNavigate();
  const user = localStorage.getItem("user:details");
  return (
    <main className="border-r-[1px] border-neutral-300 p-4  w-full h-screen sticky top-0 bg-white">
      <div className="flex flex-col gap-6">
        <span className="font-playball font-bold text-3xl text-blue-400">
          TweeTopia
        </span>
        <div
          className="flex flex-row items-end gap-4"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/");
            setSelectedTab("home");
          }}
        >
          <GrHomeRounded
            size={28}
            color={selectedTab === "home" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold  mb-[-2px] ${
              selectedTab === "home" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Home
          </span>
        </div>
        <div
          className="flex flex-row items-end gap-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/user/search");
            setSelectedTab("search");
          }}
        >
          <IoSearch
            size={32}
            color={selectedTab === "search" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold  mb-[-2px] ${
              selectedTab === "search" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Search
          </span>
        </div>
        <div
          className="flex flex-row items-end gap-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!user) {
              navigate("/user/signin");
              return;
            }
            openModal();
            setSelectedTab("write");
          }}
        >
          <FaFeather
            size={30}
            color={selectedTab === "write" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold  mb-[-2px] ${
              selectedTab === "write" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Create
          </span>
        </div>
        <div
          className="flex flex-row items-end gap-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const isLoggedIn = localStorage.getItem("user:token") !== null;
            if (!isLoggedIn) navigate("/user/signup");
            else {
              navigate("/user/notifications");
              setSelectedTab("mail");
            }
          }}
        >
          <MdMailOutline
            size={30}
            color={selectedTab === "mail" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold  mb-[-2px] ${
              selectedTab === "mail" ? "text-[#313233]" : "text-[#7d8085]"
            }`}
          >
            Notifications
          </span>
        </div>
        <div
          className="flex flex-row items-end gap-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const isLoggedIn = localStorage.getItem("user:token") !== null;
            if (!isLoggedIn) navigate("/user/signup");
            else {
              navigate("/user/profile");
              setSelectedTab("profile");
            }
          }}
        >
          <FaRegUser
            size={27}
            color={selectedTab === "profile" ? "#313233" : "#7d8085"}
          />
          <span
            className={`font-semibold  mb-[-2px] ${
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

export default Sidebar;
