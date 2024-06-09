import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FaFeather } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileBottomNav = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const navigate = useNavigate();
  return (
    <main className="border-t-[1px] border-neutral-300 p-4">
      <div className="flex flex-row items-center justify-between">
        <GrHomeRounded
          size={28}
          color={selectedTab === "home" ? "#313233" : "#7d8085"}
          onClick={() => {
            navigate("/");
            setSelectedTab("home");
          }}
        />
        <IoSearch
          size={32}
          color={selectedTab === "search" ? "#313233" : "#7d8085"}
          onClick={() => setSelectedTab("search")}
        />
        <FaFeather
          size={30}
          color={selectedTab === "write" ? "#313233" : "#7d8085"}
          onClick={() => setSelectedTab("write")}
        />
        <MdMailOutline
          size={30}
          color={selectedTab === "mail" ? "#313233" : "#7d8085"}
          onClick={() => setSelectedTab("mail")}
        />
        <FaRegUser
          size={27}
          onClick={() => {
            const isLoggedIn = localStorage.getItem("user:token") !== null;
            if (!isLoggedIn) navigate("/user/signup");
            else {
              navigate("/user/profile");
              setSelectedTab("profile");
            }
          }}
          color={selectedTab === "profile" ? "#313233" : "#7d8085"}
        />
      </div>
    </main>
  );
};

export default MobileBottomNav;
