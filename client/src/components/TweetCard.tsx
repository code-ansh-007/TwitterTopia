import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const TweetCard = ({ tweet }: any) => {
  const userPic = tweet.createdBy.profileImageUrl;
  const username = tweet.createdBy.username;
  const tweetMedia = tweet.fileUrl;
  const [lineClamp, setLineClamp] = useState(true);
  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-row items-center  gap-3 justify-between">
        <div className="flex flex-row items-center gap-3">
          <img
            src={userPic ? userPic : "/placeholder.png"}
            alt="user pic"
            className="w-8 h-8 rounded-full"
          />
          <span>{username}</span>
        </div>
        <HiDotsVertical size={20} />
      </div>
      <span
        className={`text-sm  ${lineClamp ? "line-clamp-3" : ""}`}
        onClick={() => setLineClamp(!lineClamp)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        ducimus fugit minus, a quaerat ut enim officiis deserunt autem
        cupiditate labore dolores. Perspiciatis dolor possimus explicabo
        delectus tempora amet modi ipsa, minus nisi quidem rem asperiores aut in
        itaque doloribus earum, non vel laudantium ab.
      </span>
      {/* {tweetMedia !== "" &&  } */}
    </main>
  );
};

export default TweetCard;
