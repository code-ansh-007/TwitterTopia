import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TweetCard from "../components/TweetCard";
import MiniUserCard from "../components/MiniUserCard";
import toast, { Toaster } from "react-hot-toast";

const UserDetails = () => {
  const { userId } = useParams();
  const [compUser, setCompUser] = useState<any>({});
  const [tab, setTab] = useState<string>("following");
  const [posts, setPosts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/tweet/${userId}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log("error while fetching user details: ", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/user/${userId}`
      );
      setCompUser(res.data);
    } catch (error) {
      console.log("error while fetching user details: ", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserPosts();
  }, []);

  const followUser = async () => {
    if (!user) {
      navigate("/user/signin");
      return;
    }
    try {
      await axios
        .post(
          `https://twitter-topia-one.vercel.app/api/user/${compUser?._id}/follow`,
          {
            followerId: user?.userId,
          }
        )
        .then((res) => {
          window.location.reload(); // ? refreshing page
          toast(`Followed ${compUser?.username}`, { icon: "✅" });
        });
    } catch (error) {
      console.log("Error while following user: ", error);
    }
  };

  const unfollowUser = async () => {
    if (!user) {
      navigate("/user/signin");
      return;
    }
    try {
      await axios
        .post(
          `https://twitter-topia-one.vercel.app/api/user/${compUser?._id}/unfollow`,
          {
            followerId: user?.userId,
          }
        )
        .then((res) => {
          window.location.reload(); // ? refreshing page
          toast(`Unfollowed ${compUser?.username}`, { icon: "✅" });
        });
    } catch (error) {
      console.log("Error while unfollowing user: ", error);
    }
  };

  return (
    <main className="relative w-full md:max-w-[50vw] mb-[100px]">
      <div className="w-full h-[150px] overflow-hidden relative">
        <img
          src="/profile-bg.jpg"
          alt="profile bg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-[80px] right-2 md:right-5">
        <img
          src={
            compUser?.profileImageUrl
              ? compUser?.profileImageUrl
              : "/placeholder.png"
          }
          alt="profile pic"
          className="w-32  md:w-40 md:h-40 h-32 rounded-full shadow-md"
        />
      </div>

      <span className="text-left w-full text-4xl pl-1 font-bold">
        {compUser?.username}
      </span>
      <section className="px-2 w-full">
        <div className="flex flex-row items-center gap-4 mt-4 text-neutral-600 w-full">
          <div className="flex flex-row items-center gap-2">
            <span>{compUser?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-row items-center gap-2 w-full">
            <span>{compUser?.following?.length}</span>
            <span>Following</span>
          </div>
        </div>
      </section>
      {compUser?._id !== user?.userId && (
        <div className="mt-4 px-2 w-full">
          {compUser?.followers?.some((follower: any) =>
            follower._id.includes(user?.userId)
          ) ? (
            <button
              onClick={unfollowUser}
              className="bg-red-500 outline-none text-white px-2 py-1 rounded-md active:scale-105 transition transform duration-300"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={followUser}
              className="bg-blue-500 outline-none text-white px-2 py-1 rounded-md active:scale-105 transition transform duration-300"
            >
              Follow
            </button>
          )}
        </div>
      )}
      {/* TAB SELECTION */}
      <main className="mt-5 px-5 border-b-[1px] border-neutral-300 w-full">
        <div className="w-full flex flex-row items-center justify-between ">
          <span
            className={`${
              tab === "following"
                ? "border-b-[4px] border-blue-400"
                : "border-b-[4px] border-transparent"
            }`}
            onClick={() => setTab("following")}
          >
            Following
          </span>
          <span
            className={`${
              tab === "followers"
                ? "border-b-[4px] border-blue-400"
                : "border-b-[4px] border-transparent"
            }`}
            onClick={() => setTab("followers")}
          >
            Followers
          </span>
          <span
            className={`${
              tab === "your-posts"
                ? "border-b-[4px] border-blue-400"
                : "border-b-[4px] border-transparent"
            } `}
            onClick={() => setTab("your-posts")}
          >
            Posts
          </span>
        </div>
      </main>
      {/* TAB CONTENT BELOW */}
      <div className="px-4 mt-5 w-full">
        {tab === "following" ? (
          <div className="w-full flex flex-col gap-3">
            {compUser?.following?.length === 0 ? (
              <span className="text-center w-full text-neutral-500">
                {compUser?.username} doesn't follow anyone.
              </span>
            ) : (
              compUser?.following?.map((item: any, ind: any) => {
                return (
                  <div key={ind} className="flex w-full">
                    <MiniUserCard item={item} />
                  </div>
                );
              })
            )}
          </div>
        ) : tab === "followers" ? (
          <div className="flex w-full flex-col gap-3">
            {compUser?.followers?.length === 0 ? (
              <span className="text-center w-full text-neutral-500">
                {compUser?.username} has no followers.
              </span>
            ) : (
              compUser?.followers?.map((item: any, ind: any) => {
                return (
                  <div key={ind} className="flex w-full">
                    <MiniUserCard item={item} />
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="flex w-full">
            {posts?.length === 0 ? (
              <span className="text-center w-full text-neutral-500">
                {compUser?.username} has not posted anything.
              </span>
            ) : (
              <div className="flex flex-col gap-5">
                {posts?.map((post, ind) => {
                  return (
                    <div key={ind} className="w-full">
                      <TweetCard tweet={post} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </main>
  );
};

export default Layout(UserDetails);
