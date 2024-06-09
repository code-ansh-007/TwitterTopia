import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import TweetCard from "../components/TweetCard";
import useHomeTabStore from "../utils/homtTabStore";
import Loader from "../components/Loader";

const Home = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const { selectedTab } = useHomeTabStore();
  const [compUser, setCompUser] = useState<any>({});
  const [followingPosts, setFollowingPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPostsFromPeopleYouFollow = async () => {
    const following = compUser?.following;
    if (following && following.length > 0) {
      setLoading(true);
      following.forEach(async (person: any) => {
        try {
          const posts = await fetchPostsWithID(person._id);
          setFollowingPosts((prevPosts) => [...prevPosts, ...posts]);
        } catch (error) {
          console.log("Error fetching posts of user: ", error);
        }
      });
    }
    setLoading(false);
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

  const fetchAllTweets = async () => {
    try {
      const res = await axios.get(
        "https://twitter-topia-one.vercel.app/api/tweet/"
      );
      setTweets(res.data);
    } catch (error) {
      console.log("error fetching tweets from client", error);
    }
  };

  const fetchPostsWithID = async (userId: string) => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/tweet/${userId}`
      );
      return res.data;
    } catch (error) {
      console.log("error while fetching user posts: ", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/tweet/${user.userId}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log("error while fetching user posts: ", error);
    }
  };

  useEffect(() => {
    fetchAllTweets();
    fetchUserPosts();
    fetchUserDetails();
    fetchPostsFromPeopleYouFollow();
  }, [selectedTab]);
  return (
    <main className="flex flex-col gap-8 ">
      {selectedTab === "for-you" ? (
        tweets?.map((tweet, ind) => {
          return (
            <div key={ind}>
              <TweetCard tweet={tweet} />
            </div>
          );
        })
      ) : selectedTab === "following" ? (
        followingPosts.length === 0 ? (
          <span className="text-center w-full text-neutral-500">
            No one has posted yet!.
          </span>
        ) : (
          followingPosts?.map((tweet, ind) => {
            return (
              <div key={ind}>
                <TweetCard tweet={tweet} />
              </div>
            );
          })
        )
      ) : (
        posts?.map((tweet, ind) => {
          return (
            <div key={ind}>
              <TweetCard tweet={tweet} />
            </div>
          );
        })
      )}
    </main>
  );
};

export default Layout(Home);
