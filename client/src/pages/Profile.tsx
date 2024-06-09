import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const [compUser, setCompUser] = useState<any>({});

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
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <main className="relative">
      <div className="w-full h-[150px] overflow-hidden ">
        <img
          src="/profile-bg.jpg"
          alt="profile bg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-[80px] right-2">
        <img
          src={user.profileImageUrl}
          alt="profile pic"
          className="w-32  h-32 rounded-full shadow-md"
        />
      </div>
      {/* <button className="bg-red-500" onClick={logout}>
        logout
      </button> */}
      <span className="text-left w-full text-6xl pl-1 font-bold">
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
    </main>
  );
};

export default Layout(Profile);
