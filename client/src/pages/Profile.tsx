import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TweetCard from "../components/TweetCard";
import { HiDotsVertical } from "react-icons/hi";
import MiniUserCard from "../components/MiniUserCard";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const [compUser, setCompUser] = useState<any>({});
  const [tab, setTab] = useState<string>("following");
  const [posts, setPosts] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/tweet/${user.userId}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log("error while fetching user details: ", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/user/${user.userId}`
      );
      // console.log(res.data);
      setCompUser(res.data);
    } catch (error) {
      console.log("error while fetching user details: ", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserPosts();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <main className="relative w-full md:max-w-[50vw] mb-[100px]">
      <div className="w-full h-[150px] overflow-hidden  relative">
        <img
          src="/profile-bg.jpg"
          alt="profile bg"
          className="object-cover w-full h-full"
        />
        <span
          className="absolute top-4 left-3"
          onClick={() => setShowMenu(!showMenu)}
        >
          <HiDotsVertical size={30} className="text-white" />
        </span>
        {/* MENU */}
        {showMenu && (
          <div className="bg-white p-2 rounded-md absolute left-12 top-3">
            <button
              onClick={logout}
              className="text-red-500 font-semibold bg-neutral-200 px-2 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="absolute top-[80px] right-2">
        <img
          src={
            user?.profileImageUrl ? user?.profileImageUrl : "/placeholder.png"
          }
          alt="profile pic"
          className="w-32 md:w-40 md:h-40 h-32 rounded-full shadow-md"
        />
      </div>

      <span className="text-left w-full text-4xl pl-1 font-bold">
        {user.username}
      </span>
      <section className="px-2">
        <div className="flex flex-row items-center gap-4 mt-4 text-neutral-600">
          <div className="flex flex-row items-center gap-2">
            <span>{compUser?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span>{compUser?.following?.length}</span>
            <span>Following</span>
          </div>
        </div>
      </section>
      {/* TAB SELECTION */}
      <main className="mt-5 px-2 border-b-[1px] border-neutral-300">
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
            Your Posts
          </span>
        </div>
      </main>
      {/* TAB CONTENT BELOW */}
      <div className="px-4 mt-5 w-full">
        {tab === "following" ? (
          <div className="w-full flex flex-col gap-3">
            {compUser?.following?.length === 0 ? (
              <span className="text-center w-full text-neutral-500">
                You don't follow anyone.
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
                You have no followers.
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
          <div className="flex w-full flex-col gap-3">
            {posts?.length === 0 ? (
              <span className="text-center w-full text-neutral-500">
                You have not posted anything.
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
    </main>
  );
};

export default Layout(Profile);
