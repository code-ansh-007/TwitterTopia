import Comment from "../model/Comment.js";
import Tweet from "../model/Tweet.js";

export const handleCommentCreation = async (req, res, next) => {
  try {
    const { text, createdBy, tweetId } = req.body;

    if (!text || !createdBy || !tweetId)
      return res.status(400).json({ err: "Missing Fields" });
    const newComment = await Comment.create({
      text,
      createdBy,
      tweetId,
    });

    await Tweet.findByIdAndUpdate(
      tweetId,
      { $push: { comments: newComment._id } },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).json(newComment);
  } catch (error) {
    console.log("Error while creating comment, from server: ", error);
    return res.status(500).json(error);
  }
};

export const handleCommentDeletion = async (req, res, next) => {
  try {
    const { commentId, tweetId } = req.body;
    if (!commentId || !tweetId) {
      return res.status(400).json({ error: "Missing Fields" });
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await Tweet.findByIdAndUpdate(
      tweetId,
      { $pull: { comments: commentId } },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error while deleting comment, from server: ", error);
    return res.status(500).json(error);
  }
};
