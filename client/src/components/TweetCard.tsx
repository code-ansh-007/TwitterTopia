import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiPencilFill } from "react-icons/ri";
import useUpdateModalStore from "../utils/updateModalStore";
import { AiFillProfile } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TweetCard = ({ tweet }: any) => {
  const userPic = tweet.createdBy.profileImageUrl;
  const username = tweet.createdBy.username;
  const tweetMedia = tweet.fileUrl;
  const message = tweet.message;
  const [lineClamp, setLineClamp] = useState(true);
  const [mediaType, setMediaType] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { openModal } = useUpdateModalStore();
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const navigate = useNavigate();

  const checkMediaType = (tweetMedia: string) => {
    if (tweetMedia.endsWith(".jpg")) setMediaType("image");
    else setMediaType("video");
  };

  useEffect(() => {
    checkMediaType(tweetMedia);
  }, [tweetMedia]);

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
          <div className="bg-white p-2 rounded-md absolute right-6 top-5 shadow-lg flex flex-col gap-2">
            <button
              onClick={() => {
                navigate(`/userDetails/${tweet?.createdBy?._id}`);
              }}
              className=" bg-neutral-200 px-2 py-1 rounded-md flex flex-row items-center gap-2"
            >
              <AiFillProfile size={26} />
              <span>Visit Profile</span>
            </button>

            {user.userId === tweet.createdBy._id && (
              <button
                onClick={() => openModal(tweet._id)}
                className=" bg-neutral-200 px-2 py-1 rounded-md flex flex-row items-center gap-2"
              >
                <RiPencilFill size={24} />
                <span>Edit Tweet</span>
              </button>
            )}
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
      <Toaster />
    </main>
  );
};

export default TweetCard;
