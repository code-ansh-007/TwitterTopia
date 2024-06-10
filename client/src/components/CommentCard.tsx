import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const CommentCard = ({ comment }: any) => {
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const [showLess, setShowLess] = useState<boolean>(true);

  const deleteComment = async () => {
    try {
      await axios
        .delete("https://twitter-topia-one.vercel.app/api/comment/delete", {
          data: {
            commentId: comment._id,
            tweetId: comment.tweetId,
          },
        })
        .then((res) => {
          toast("Comment Deleted", { icon: "✅" });
          window.location.reload();
        });
    } catch (error) {
      console.log("Error while deleting comment from client: ", error);
    }
  };

  return (
    <main>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img
            src={
              comment.createdBy.profileImageUrl
                ? comment.createdBy.profileImageUrl
                : "/placeholder.png"
            }
            alt="user img"
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm">{comment.createdBy.username}</span>
        </div>
        {user.userId === comment.createdBy._id && (
          <MdDelete
            onClick={deleteComment}
            size={24}
            className="text-red-500 active:scale transition transform duration-300"
          />
        )}
      </div>
      <span
        className={`${showLess ? "line-clamp-2" : ""} text-xs`}
        onClick={() => setShowLess(!showLess)}
      >
        {comment.text}
      </span>
    </main>
  );
};

export default CommentCard;
