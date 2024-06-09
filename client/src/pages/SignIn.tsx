import React, { FormEvent, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast("Fill all the Fields", { icon: "🖋️" });
      return;
    }
    try {
      const response = await axios.post(
        "https://twitter-topia-one.vercel.app/api/user/login",
        {
          username,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("user:token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "user:details",
          JSON.stringify(response.data.user)
        );
        toast("You are logged in", { icon: "✅" });
        navigate("/");
      }
    } catch (error) {
      console.log("Error while logging in user: ", error);
      toast("Username Or Password Incorrect!", { icon: "❌" });
    }
  };

  return (
    <form className="p-2 flex flex-col items-center" onSubmit={handleSignIn}>
      <div className="w-full" onClick={() => navigate("/")}>
        <GoArrowLeft size={30} className="text-neutral-600" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-full px-5 gap-3">
        <span className="font-playball font-bold text-4xl text-blue-400">
          TweeTopia
        </span>
        <div className="w-full">
          <label htmlFor="username" className="text-blue-400">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="john_doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-[1px] rounded-md border-blue-400 p-2 text-sm outline-none w-full text-neutral-600"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="text-blue-400">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="*************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[1px] rounded-md border-blue-400 p-2 text-sm outline-none w-full text-neutral-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white p-3 rounded-md mt-5 active:scale-110 transition transform duration-300"
        >
          Sign In
        </button>
        <span className="text-sm ">
          Don't have an account?{" "}
          <a href="/user/signup" className="text-blue-500">
            Sign Up
          </a>
        </span>
      </div>
      <Toaster />
    </form>
  );
};

export default SignIn;
