import React from "react";
import { useNavigate } from "react-router-dom";

const MiniProfileCard = ({ person }: any) => {
    const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/userDetails/${person._id}`)} className="flex flex-col rounded-lg shadow-md">
      <div className="relative">
        <div className="w-full h-20 relative">
          <img
            src="/profile-bg.jpg"
            alt="profile bg"
            className="w-full h-full object-cover object-center rounded-t-lg"
          />
        </div>
        <div className="absolute top-[40px] right-3 w-20 md:w-30 md:h-30 h-20">
          <img
            src={
              person?.profileImageUrl
                ? person?.profileImageUrl
                : "/placeholder.png"
            }
            alt="profile pic"
            className="object-cover object-center w-full h-full rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <span className="font-bold text-2xl">{person?.username}</span>
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row items-center gap-1">
            <span>{person?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span>{person?.following?.length}</span>
            <span>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProfileCard;
