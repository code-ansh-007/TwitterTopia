import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import TweetCard from "../components/TweetCard";
import Loader from "../components/Loader";

const Home = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const [selectedTab, setSelectedTab] = useState("for-you");
  const [compUser, setCompUser] = useState<any>({});
  const [followingPosts, setFollowingPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPostsFromPeopleYouFollow = async () => {
    const following = compUser?.following;
    if (following && following.length > 0) {
      setLoading(true);
      setFollowingPosts([]);

      try {
        const postsPromises = following.map((person: any) =>
          fetchPostsWithID(person._id)
        );
        const allPosts = await Promise.all(postsPromises);
        const combinedPosts = allPosts.flat();

        const uniquePosts = Array.from(
          new Set(combinedPosts.map((post) => post._id))
        ).map((id) => combinedPosts.find((post) => post._id === id));

        setFollowingPosts(uniquePosts);
      } catch (error) {
        console.log("Error fetching posts of user: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `https://twitter-topia-one.vercel.app/api/user/${user?.userId}`
      );
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
        `https://twitter-topia-one.vercel.app/api/tweet/${compUser?._id}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log("error while fetching user posts: ", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await fetchUserDetails();
      await fetchUserPosts();
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAllTweets();
      await fetchUserDetails();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTab !== "for-you") return;
    const fetchForYouData = async () => {
      setLoading(true);
      await fetchAllTweets();
      setLoading(false);
    };
    fetchForYouData();
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab !== "following") return;
    const fetchFollowingData = async () => {
      setLoading(true);
      await fetchPostsFromPeopleYouFollow();
      setLoading(false);
    };
    fetchFollowingData();
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab !== "your-posts") return;
    const fetchYourPostsData = async () => {
      setLoading(true);
      await fetchUserPosts();
      setLoading(false);
    };
    fetchYourPostsData();
  }, [selectedTab]);

  return (
    <main className="flex flex-col gap-8 md:max-w-[40vw] mb-20 relative">
      <div className="w-full flex flex-row items-center justify-between border-b-[1px] border-neutral-300">
        <span
          className={`${
            selectedTab === "for-you"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          }`}
          onClick={() => {
            if (selectedTab === "for-you") return;
            setFollowingPosts([]);
            setPosts([]);
            setTweets([]);
            setSelectedTab("for-you");
          }}
        >
          For You
        </span>
        <span
          className={`${
            selectedTab === "following"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          }`}
          onClick={() => {
            if (selectedTab === "following") return;
            setFollowingPosts([]);
            setPosts([]);
            setTweets([]);
            setSelectedTab("following");
          }}
        >
          Following
        </span>
        <span
          className={`${
            selectedTab === "your-posts"
              ? "border-b-[4px] border-blue-400"
              : "border-b-[4px] border-transparent"
          }`}
          onClick={() => {
            if (selectedTab === "your-posts") return;
            setFollowingPosts([]);
            setPosts([]);
            setTweets([]);
            setSelectedTab("your-posts");
          }}
        >
          Your Posts
        </span>
      </div>

      {loading && (
        <div className="inset-0 flex items-center justify-center">
          <Loader color="blue-500" size={30} />
        </div>
      )}

      {selectedTab === "for-you" ? (
        <div className="flex flex-col gap-5">
          {tweets?.map((tweet, ind) => {
            return (
              <div key={ind}>
                <TweetCard tweetId={tweet._id} />
              </div>
            );
          })}
        </div>
      ) : selectedTab === "following" ? (
        <div className="flex flex-col gap-5">
          {followingPosts?.map((tweet, ind) => {
            return (
              <div key={ind}>
                <TweetCard tweetId={tweet._id} />
              </div>
            );
          })}
        </div>
      ) : selectedTab === "your-posts" ? (
        <div className="flex flex-col gap-5">
          {posts?.map((tweet, ind) => {
            return (
              <div key={ind}>
                <TweetCard tweetId={tweet._id} />
              </div>
            );
          })}
        </div>
      ) : null}
    </main>
  );
};

export default Layout(Home);
