import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IoConstruct } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import MiniProfileCard from "../components/MiniProfileCard";
import TweetCard from "../components/TweetCard";
import Loader from "../components/Loader";

const Search = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [tweets, setTweets] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchUsers, setSearchUsers] = useState<any[]>([]);
  const [searchTweets, setSearchTweets] = useState<any[]>([]);
  const [showEmpty, setShowEmpty] = useState<boolean>(false);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        "https://twitter-topia-one.vercel.app/api/user"
      );
      if (res.data) {
        // console.log("fetched users");
        setUsers(res.data);
      }
    } catch (error) {
      console.log("Error while fetching users, from client: ", error);
    }
  };

  const fetchAllTweets = async () => {
    try {
      const res = await axios.get(
        "https://twitter-topia-one.vercel.app/api/tweet"
      );
      if (res.data) {
        // console.log("fetched tweets");
        setTweets(res.data);
      }
    } catch (error) {
      console.log("Error while fetching tweets, from client: ", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllTweets();
  }, []);

  const handleSearch = () => {
    if (!searchText) {
      return;
    }
    setLoading(true);
    setSelectedTab("");
    setShowEmpty(false);
    setSearchUsers([]);
    setSearchTweets([]);

    const filteredUsers = users
      .filter((user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((user) => ({ ...user, searchType: "user" }));

    setSearchUsers(filteredUsers);

    const filteredTweets = tweets
      .filter((tweet) =>
        tweet.message.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((tweet) => ({ ...tweet, searchType: "tweet" }));
    setSearchTweets(filteredTweets);

    if (filteredUsers.length === 0 && filteredTweets.length === 0) {
      setShowEmpty(true);
    }

    if (filteredUsers.length > 0 && filteredTweets.length > 0) {
      setSelectedTab("users");
    } else if (filteredUsers.length > 0) {
      setSelectedTab("users");
    } else {
      setSelectedTab("tweets");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col p-2 gap-4 pb-20 md:max-w-[40vw]">
      <span className="font-playball text-2xl text-blue-400">
        Search TweeTopia
      </span>
      <div className="flex flex-row items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search anything"
          className="border-[1px] border-neutral-300 p-[13px] rounded-lg w-full outline-none text-sm text-neutral-600"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-400 w-fit p-2 rounded-lg outline-none active:scale-105 transition transform duration-300 cursor-pointer"
        >
          <IoSearch size={30} className="text-white" />
        </button>
      </div>
      {/* Search REsults section */}
      <main className="w-full flex flex-col">
        {/* {loading ? <Loader size={40} color="blue-500" /> : null} */}
        {showEmpty && (
          <span className="text-center w-full text-neutral-600">
            No such users or tweets.
          </span>
        )}
        {searchUsers.length > 0 || searchTweets.length > 0 ? (
          <div className="w-full">
            <div className="w-full flex flex-row items-center justify-between mb-5">
              <span
                className={`${
                  selectedTab === "users"
                    ? "border-b-[4px] border-blue-400"
                    : "border-b-[4px] border-transparent"
                } w-full text-center text-neutral-600`}
                onClick={() => setSelectedTab("users")}
              >
                Users
              </span>
              <span
                className={`${
                  selectedTab === "tweets"
                    ? "border-b-[4px] border-blue-400"
                    : "border-b-[4px] border-transparent"
                } w-full text-center text-neutral-600`}
                onClick={() => {
                  setSelectedTab("tweets");
                }}
              >
                Tweets
              </span>
            </div>
            {showEmpty ? (
              <span>No such users or tweets.</span>
            ) : selectedTab === "users" ? (
              <div className="flex flex-col gap-5 w-full">
                {searchUsers.length === 0 ? (
                  <span className="text-center w-full text-neutral-600">
                    No such users.
                  </span>
                ) : (
                  searchUsers?.map((user, ind) => {
                    return (
                      <div key={ind}>
                        <MiniProfileCard person={user} />
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="w-full flex">
                {searchTweets.length === 0 ? (
                  <span className="text-center w-full text-neutral-600">
                    No such tweets.
                  </span>
                ) : (
                  searchTweets?.map((tweet, ind) => {
                    return (
                      <div key={ind}>
                        <TweetCard tweetId={tweet._id} />
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        ) : null}
      </main>
    </main>
  );
};

export default Layout(Search);
