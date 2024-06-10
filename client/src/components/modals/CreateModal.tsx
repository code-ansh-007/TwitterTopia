import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import useCreateModalStore from "../../utils/zustandStore";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const CreateModal = () => {
  const { isModalOpen, closeModal } = useCreateModalStore();
  const navigate = useNavigate();
  let user: any;
  if (localStorage.getItem("user:details")) {
    user = JSON.parse(localStorage.getItem("user:details") || "");
  }
  const [message, setMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  if (!isModalOpen) return null;

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!message) {
        toast("Missing message!", { icon: "❌" });
        return;
      }
      if (message.length > 280) {
        toast("Character limit exceeded(280 characters)", { icon: "⚠️" });
        return;
      }
      setShowLoader(true);
      const formData = new FormData();
      formData.append("message", message);
      formData.append("userId", user.userId);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      await axios
        .post(
          "https://twitter-topia-one.vercel.app/api/tweet/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log("Tweet created successfully");
          toast("Tweet Created Successfully");
          closeModal();
          navigate("/");
          window.location.reload();
          setShowLoader(false);
        });
    } catch (error) {
      console.log("Error while creating post: ", error);
      toast("Internal Server Error", { icon: "⚠️" });
    }
  };

  const handleMediaClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      setSelectedFile(file);
    }
  };

  return (
    <main className=" fixed  inset-0 bg-neutral-500 bg-opacity-40  w-full flex flex-col items-center justify-center px-6">
      <form
        onSubmit={handleCreate}
        className="flex bg-white rounded-md w-full p-2 flex-col gap-2 md:max-w-[40vw]"
      >
        <div className="flex w-full  border-b-[1px] border-neutral-300">
          <span className="font-playball font-semibold text-xl text-blue-400 w-full">
            Create a Tweet
          </span>
          <IoMdClose
            size={26}
            className="text-neutral-500"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-neutral-500">
            Message
          </label>
          <textarea
            spellCheck={false}
            name=""
            id=""
            className=" border-[2px] rounded-md p-1 text-sm outline-none"
            rows={4}
            placeholder="Once upon a time..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-neutral-500">
            Media(optional)
          </label>
          <div className="flex flex-row items-center gap-4">
            <div
              onClick={handleMediaClick}
              className="border-[2px] rounded-md border-blue-500 w-fit p-1 bg-blue-200"
            >
              <MdPhotoCamera size={32} className="text-blue-500" />
            </div>
            <div
              onClick={handleMediaClick}
              className="border-[2px] rounded-md border-orange-500 w-fit p-1 bg-orange-200"
            >
              <FaVideo size={32} className="text-orange-500" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileInputChange}
            />
          </div>
          {selectedFile && (
            <span className="text-green-500 text-sm">Media selected</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md text-white font-semibold mt-5 active:scale-110 transition transform duration-300 flex flex-row items-center justify-center gap-2"
        >
          <span>Post</span>
          {showLoader && <Loader color="white" size={26} />}
        </button>
      </form>
      <Toaster />
    </main>
  );
};

export default CreateModal;
