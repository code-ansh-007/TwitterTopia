import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const MiniUserCard = ({ item }: any) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="flex flex-row items-center gap-3 relative justify-between bg-neutral-100 p-2 rounded-md w-full">
      <div className="flex flex-row items-center gap-3 ">
        <img
          src={
            item.profileImageUrl !== ""
              ? item.profileImageUrl
              : "/placeholder.png"
          }
          alt=" user pic"
          className="w-8 h-8 rounded-full"
        />
        <span>{item.username}</span>
      </div>
      <HiDotsVertical
        size={20}
        className="text-neutral-600"
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className="bg-white p-2 rounded-md absolute right-10 top-5 shadow-md flex flex-col gap-2">
          {/* <button className=" bg-neutral-200 px-2 py-1 rounded-md">
            Visit Profile
          </button> */}
          <button className=" bg-neutral-200 px-2 py-1 rounded-md">
            Unfollow User
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniUserCard;
