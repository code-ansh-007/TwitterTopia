import React, { FormEvent, useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiPencilFill } from "react-icons/ri";
import useUpdateModalStore from "../utils/updateModalStore";
import { AiFillProfile } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMdThumbsUp } from "react-icons/io";
import { IoMdThumbsDown } from "react-icons/io";
import { MdDelete, MdModeComment } from "react-icons/md";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import CommentCard from "./CommentCard";

const TweetCard = ({ tweetId }: any) => {
  const [tweet, setTweet] = useState<any>({});

  const fetchTweet = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/tweet/single/${tweetId}`
      );
      if (res.data) {
        setTweet(res.data);
      }
    } catch (error) {
      console.log("Error while fetching tweet: ", error);
    }
  };

  const [lineClamp, setLineClamp] = useState(true);
  const [mediaType, setMediaType] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { openModal } = useUpdateModalStore();
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");
  const [interaction, setInteraction] = useState<boolean>(false);

  const checkMediaType = (tweetMedia: string) => {
    if (
      tweetMedia?.endsWith(".jpg") ||
      tweetMedia?.endsWith(".png") ||
      tweetMedia?.endsWith(".jpeg")
    )
      setMediaType("image");
    else if (tweetMedia?.endsWith(".mp4") || tweetMedia?.endsWith(".mov"))
      setMediaType("video");
    else setMediaType("");
  };

  useEffect(() => {
    checkMediaType(tweet?.fileUrl);
  }, [tweet?.fileUrl]);

  useEffect(() => {
    fetchTweet();
  }, [interaction]);

  const handleLikeClick = async () => {
    if (!user) {
      navigate("/user/signin");
      return;
    }
    try {
      if (
        !tweet?.likes?.includes(user?.userId) &&
        !tweet?.dislikes?.includes(user?.userId)
      ) {
        await likeTweet();
      } else if (tweet?.likes?.includes(user?.userId)) {
        await removeLike();
      }
      setInteraction(!interaction);
    } catch (error) {
      console.log("error while liking tweet: ", error);
    }
  };

  const handleDislikeClick = async () => {
    if (!user) {
      navigate("/user/signin");
      return;
    }
    try {
      if (
        !tweet?.dislikes?.includes(user?.userId) &&
        !tweet?.likes?.includes(user?.userId)
      ) {
        await dislikeTweet();
      } else if (tweet?.dislikes?.includes(user?.userId)) {
        await removeDislike();
      }
      setInteraction(!interaction);
    } catch (error) {
      console.log("error while disliking tweet: ", error);
    }
  };

  const likeTweet = async () => {
    try {
      const res = await axios.post(
        `https://twitter-topia-one.vercel.app/api/tweet/like/${tweet._id}`,
        {
          userId: user.userId,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("error while liking tweet from client: ", error);
    }
  };

  const dislikeTweet = async () => {
    try {
      const res = await axios.post(
        `https://twitter-topia-one.vercel.app/api/tweet/dislike/${tweet._id}`,
        {
          userId: user.userId,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("error while disliking tweet from client: ", error);
    }
  };

  const removeLike = async () => {
    try {
      const res = await axios.post(
        `https://twitter-topia-one.vercel.app/api/tweet/remove-like/${tweet._id}`,
        {
          userId: user.userId,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("error while removing like, from client: ", error);
    }
  };

  const removeDislike = async () => {
    try {
      const res = await axios.post(
        `https://twitter-topia-one.vercel.app/api/tweet/remove-dislike/${tweet._id}`,
        {
          userId: user.userId,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("error while removing dislike, from client: ", error);
    }
  };

  const handleCommentPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) navigate("/user/signin");
    if (!comment) {
      toast("No content in comment!", { icon: "❗" });
      return;
    }
    try {
      const res = await axios.post(
        "https://twitter-topia-one.vercel.app/api/comment/create",
        {
          text: comment,
          createdBy: user.userId,
          tweetId: tweet._id,
        }
      );
      if (res.data) {
        toast("comment posted", { icon: "✅" });
        setInteraction(!interaction);
      }
    } catch (error) {
      console.log("error while posting comment");
      toast("Internal server error!", { icon: "⚠️" });
    }
  };

  const deleteTweet = async () => {
    try {
      await axios
        .delete(`https://twitter-topia-one.vercel.app/api/tweet/${tweet._id}`)
        .then((res) => {
          console.log("Deleted Tweet");
          toast("Successfully Deleted Tweet", { icon: "✅" });
        });
    } catch (error) {
      console.log("error deleting tweet: ", error);
      toast("Error Deleting Tweet", { icon: "⚠️" });
    }
  };

  return (
    <main className="flex flex-col gap-2 border-b-[1px] border-neutral-300 pb-4 w-full">
      <div className="flex flex-row items-center  gap-3 justify-between relative">
        <div className="flex flex-row items-center gap-3">
          <div className="relative w-8 h-8">
            <img
              src={
                tweet?.createdBy?.profileImageUrl
                  ? tweet?.createdBy?.profileImageUrl
                  : "/placeholder.png"
              }
              alt="user pic"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
          <span>{tweet?.createdBy?.username}</span>
        </div>
        <HiDotsVertical size={20} onClick={() => setShowMenu(!showMenu)} />
        {showMenu && (
          <div className="bg-white text-xs p-2 rounded-md absolute right-6 top-5 shadow-lg flex flex-col gap-2">
            <button
              onClick={() => {
                navigate(`/userDetails/${tweet?.createdBy?._id}`);
              }}
              className=" bg-neutral-200 px-2 py-1 rounded-md flex flex-row items-center gap-2"
            >
              <AiFillProfile size={20} />
              <span>Visit Profile</span>
            </button>

            {user?.userId === tweet?.createdBy._id && (
              <button
                onClick={() => openModal(tweet._id)}
                className=" bg-neutral-200 px-2 py-1 rounded-md flex flex-row items-center gap-2"
              >
                <RiPencilFill size={20} />
                <span>Edit Tweet</span>
              </button>
            )}
            {user?.userId === tweet?.createdBy._id && (
              <button
                onClick={deleteTweet}
                className=" bg-neutral-200 text-red-500 px-2 py-1 rounded-md flex flex-row items-center gap-2"
              >
                <MdDelete size={20} />
                <span>Delete Tweet</span>
              </button>
            )}
          </div>
        )}
      </div>
      <span
        className={`text-sm  ${lineClamp ? "line-clamp-3" : ""}`}
        onClick={() => setLineClamp(!lineClamp)}
      >
        {tweet?.message}
      </span>
      {tweet?.fileUrl !== "" && mediaType === "image" ? (
        <img
          src={tweet?.fileUrl}
          alt="tweet media"
          className="rounded-lg max-w-[400px] md:max-w-[38vw] w-full"
        />
      ) : (
        tweet?.fileUrl !== "" && (
          <video
            src={tweet?.fileUrl}
            controls
            autoPlay
            muted
            className="rounded-lg md:max-w-[38vw]"
          ></video>
        )
      )}
      {/* Interactive section below */}
      <section className="flex flex-row items-center gap-4 w-full">
        {/* Like Section */}
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row  gap-1">
            <span className="mb-[-5px]">{tweet?.likes?.length}</span>
            <IoMdThumbsUp
              size={22}
              className={`${
                tweet?.likes?.includes(user?.userId)
                  ? "text-blue-500"
                  : "text-neutral-400"
              }`}
              onClick={handleLikeClick}
            />
          </div>
          <div className="flex flex-row  gap-1">
            <span className="mb-[-5px]">{tweet?.dislikes?.length}</span>
            <IoMdThumbsDown
              size={22}
              className={`${
                tweet?.dislikes?.includes(user?.userId)
                  ? "text-red-500"
                  : "text-neutral-400"
              }`}
              onClick={handleDislikeClick}
            />
          </div>
        </div>
        {/* Comment section */}
        <div>
          <div className="flex flex-row items-center gap-1">
            <span>{tweet?.comments?.length}</span>
            <MdModeComment
              size={22}
              onClick={() => setShowComments(!showComments)}
              className={`${
                showComments ? "text-blue-500" : "text-neutral-400"
              }`}
            />
          </div>
          {/* comment section below */}
        </div>
      </section>
      {showComments && (
        <main>
          <span className="text-xs">Comments</span>
          <section className="flex flex-col gap-5 border-[1px] border-neutral-300 rounded-lg p-2 max-h-[50vh] w-full">
            {/* comment create */}
            <form
              onSubmit={handleCommentPost}
              className="flex flex-row items-center gap-2 w-full"
            >
              <input
                type="text"
                placeholder="What are your thoughts ?"
                className="text-sm border-b-[1.5px] border-blue-400 w-full outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit">
                <IoIosSend
                  size={24}
                  className="text-blue-500 active:scale-105 transition transform duration-300"
                />
              </button>
            </form>
            {/* Other's comments */}
            <div className="flex flex-col gap-3">
              {tweet?.comments?.map((comment: any, ind: any) => {
                return (
                  <div key={ind}>
                    <CommentCard comment={comment} />
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}
      <Toaster />
    </main>
  );
};

export default TweetCard;
