import e from "express";
import {
  handleFetchAllTweets,
  handleGetTweetsOfUser,
  handleTweetCreation,
  handleTweetDeletion,
  handleTweetUpdation,
} from "../controllers/tweet.js";

const router = e.Router();

// ? GET ALL THE TWEETS
router.get("/", handleFetchAllTweets);

// ? CREATE A NEW TWEET
router.post("/create", handleTweetCreation);

// ? GET TWEETS POSTED BY USER BY USER ID
router.get("/:userId", handleGetTweetsOfUser);

// ? UPDATE A TWEET BY TWEET ID
router.patch("/:tweetId", handleTweetUpdation);

// ? DELETE A TWEET BY TWEET ID
router.delete("/:tweetId", handleTweetDeletion);

export default router;
