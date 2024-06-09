import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiPencilFill } from "react-icons/ri";
import useUpdateModalStore from "../utils/updateModalStore";

const TweetCard = ({ tweet }: any) => {
  const userPic = tweet.createdBy.profileImageUrl;
  const username = tweet.createdBy.username;
  const tweetMedia = tweet.fileUrl;
  const message = tweet.message;
  const [lineClamp, setLineClamp] = useState(true);
  const [mediaType, setMediaType] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { openModal } = useUpdateModalStore();

  const checkMediaType = (tweetMedia: string) => {
    if (tweetMedia.endsWith(".jpg")) setMediaType("image");
    else setMediaType("video");
  };

  useEffect(() => {
    checkMediaType(tweetMedia);
  }, []);

  return (
    <main className="flex flex-col gap-2 border-b-[1px] border-neutral-300 pb-4 w-full">
      <div className="flex flex-row items-center  gap-3 justify-between relative">
        <div className="flex flex-row items-center gap-3">
          <img
            src={userPic ? userPic : "/placeholder.png"}
            alt="user pic"
            className="w-8 h-8 rounded-full"
          />
          <span>{username}</span>
        </div>
        <HiDotsVertical size={20} onClick={() => setShowMenu(!showMenu)} />
        {showMenu && (
          <div className="bg-white p-2 rounded-md absolute right-6 top-5 shadow-md flex flex-col gap-2">
            {/* <button className=" bg-neutral-200 px-2 py-1 rounded-md">
            Visit Profile
          </button> */}
            <button
              onClick={() => openModal(tweet._id)}
              className=" bg-neutral-200 px-2 py-1 rounded-md flex flex-row items-center gap-2"
            >
              <RiPencilFill size={24} />
              <span>Edit Tweet</span>
            </button>
          </div>
        )}
      </div>
      <span
        className={`text-sm  ${lineClamp ? "line-clamp-3" : ""}`}
        onClick={() => setLineClamp(!lineClamp)}
      >
        {message}
      </span>
      {tweetMedia !== "" && mediaType === "image" ? (
        <img
          src={tweetMedia}
          alt="tweet media"
          className="rounded-lg max-w-[400px] w-full"
        />
      ) : (
        tweetMedia !== "" && (
          <video
            src={tweetMedia}
            controls
            autoPlay
            muted
            className="rounded-lg"
          ></video>
        )
      )}
    </main>
  );
};

export default TweetCard;
