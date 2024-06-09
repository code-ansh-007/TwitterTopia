import React, { FormEvent, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import useCreateModalStore from "../../utils/zustandStore";
import { IoMdClose } from "react-icons/io";

const CreateModal = () => {
  const { isModalOpen, closeModal } = useCreateModalStore();
  const [message, setMessage] = useState<string>("");

  if (!isModalOpen) return null;

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <main className="h-full bg-neutral-500 bg-opacity-40 absolute w-full flex flex-col items-center justify-center px-6">
      <form
        onSubmit={handleCreate}
        className="flex bg-white rounded-md w-full p-2 flex-col gap-2"
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
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-neutral-500">
            Media(optional)
          </label>
          <div className="flex flex-row items-center gap-4">
            <div className="border-[2px] rounded-md border-blue-500 w-fit p-1 bg-blue-200">
              <MdPhotoCamera size={32} className="text-blue-500" />
            </div>
            <div className="border-[2px] rounded-md border-orange-500 w-fit p-1 bg-orange-200">
              <FaVideo size={32} className="text-orange-500" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-400 p-2 rounded-md text-white font-semibold mt-5"
        >
          Post
        </button>
      </form>
    </main>
  );
};

export default CreateModal;
