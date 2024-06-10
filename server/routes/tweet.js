import e from "express";
import {
  handleFetchAllTweets,
  handleGetTweetWithID,
  handleGetTweetsOfUser,
  handleRemoveFromDislikes,
  handleRemoveFromLikes,
  handleTweetCreation,
  handleTweetDeletion,
  handleTweetDislike,
  handleTweetLike,
  handleTweetUpdation,
} from "../controllers/tweet.js";
import upload from "../middlewares/multer.js";

const router = e.Router();

// ? GET ALL THE TWEETS
router.get("/", handleFetchAllTweets);

// ? GET A TWEET WITH TWEET ID
router.get("/single/:tweetId", handleGetTweetWithID);

// ? CREATE A NEW TWEET
router.post("/create", upload.single("file"), handleTweetCreation);

// ? GET TWEETS POSTED BY USER BY USER ID
router.get("/:userId", handleGetTweetsOfUser);

// ? UPDATE A TWEET BY TWEET ID
router.patch("/:tweetId", upload.single("file"), handleTweetUpdation);

// ? DELETE A TWEET BY TWEET ID
router.delete("/:tweetId", handleTweetDeletion);

// ? LIKE A TWEET
router.post("/like/:tweetId", handleTweetLike);

// ? REMOVE LIKE FROM TWEET
router.post("/remove-like/:tweetId", handleRemoveFromLikes);

// ? DISLIKE A TWEET
router.post("/dislike/:tweetId", handleTweetDislike);

// ? REMOVE DISLIKE FROM TWEET
router.post("/remove-dislike/:tweetId", handleRemoveFromDislikes);

export default router;
