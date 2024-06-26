import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { FaCamera } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      setSelectedFile(file);
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!username || !password || !confirmPassword) {
        toast("Fill all the fields.", { icon: "❗" });
        return;
      }
      if (password !== confirmPassword) {
        toast("Password and Confirm Password are different.", { icon: "❗" });
        return;
      }
      if (username.includes(" ")) {
        toast("Username cannot have blank spaces.", {
          icon: "❗",
        });
        return;
      }
      if (username.length > 10) {
        toast("Username cannot have more than 10 characters.", {
          icon: "❗",
        });
        return;
      }
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      await axios
        .post(
          "https://twitter-topia-one.vercel.app/api/user/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          navigate("/user/signin");
        });
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data === "username already exists") {
        console.log("User Exists");
        toast("User already exists please sign in.", { icon: "⚠️" });
        return;
      }
      console.log("Error while signing up client:- ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="p-2 flex flex-col items-center md:max-w-[40vw]"
        onSubmit={handleSignUp}
      >
        <div className="w-full" onClick={() => navigate("/")}>
          <GoArrowLeft size={30} className="text-neutral-600 md:hidden" />
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
          <div className="w-full">
            <label htmlFor="password" className="text-blue-400">
              Confirm Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="*************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-[1px] rounded-md border-blue-400 p-2 text-sm outline-none w-full text-neutral-600"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-blue-400 font-semibold">
              Profile Photo(Optional)
            </span>
            <div
              onClick={handleCameraClick}
              className="w-full border-blue-400 border-[1.5px] bg-blue-100 rounded-md p-2 flex items-center justify-center"
            >
              <FaCamera size={30} className="text-blue-400" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileInputChange}
            />
            {selectedFile && (
              <span className="text-green-500">Image Selected</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white p-3 rounded-md mt-5 active:scale-110 transition transform duration-300"
          >
            Sign Up
          </button>
          <span>
            Already have an account?{" "}
            <a href="/user/signin" className="text-blue-500">
              Sign In
            </a>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default SignUp;
