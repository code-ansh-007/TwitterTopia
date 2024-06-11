import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IoConstruct } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const Search = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [tweets, setTweets] = useState<any[]>([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        "https://twitter-topia-one.vercel.app/api/user"
      );
      if (res.data) {
        console.log("fetched users");
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
        console.log("fetched tweets");
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

  const handleSearch = () => {};

  return (
    <main className="flex flex-col fixed inset-0 p-4 gap-4">
      {/* <div className="flex flex-col items-center gap-2 ">
        <IoConstruct size={100} className="text-neutral-300" />
        <span className="text-neutral-400">Under Development</span>
      </div> */}
      <span className="font-playball text-2xl text-blue-400">
        Search TweeTopia
      </span>
      <div className="flex flex-row items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search anything"
          className="border-[1px] border-neutral-300 p-[13px] rounded-lg w-full outline-none text-sm text-neutral-600"
        />
        <div className="bg-blue-400 w-fit p-2 rounded-lg">
          <IoSearch size={30} className="text-white" />
        </div>
      </div>
    </main>
  );
};

export default Layout(Search);
