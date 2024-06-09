import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import TweetCard from "../components/TweetCard";

const Home = () => {
  const [tweets, setTweets] = useState<any[]>([]);

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

  useEffect(() => {
    fetchAllTweets();
  }, []);
  return (
    <main>
      {tweets?.map((tweet, ind) => {
        return (
          <div key={ind}>
            <TweetCard />
          </div>
        );
      })}
    </main>
  );
};

export default Layout(Home);
