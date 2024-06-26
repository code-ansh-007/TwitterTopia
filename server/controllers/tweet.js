import Tweet from "../model/Tweet.js";
import cloudinary from "../utils/cloudinaryConfig.js";

export const handleTweetCreation = async (req, res, next) => {
  try {
    const { message, userId } = req.body;

    let fileUrl;
    let resourceType;
    // console.log(req.file);
    if (req.file) {
      resourceType = "auto";
      if (req.file.mimetype.startsWith("image/")) {
        resourceType = "image";
      } else if (req.file.mimetype.startsWith("video/")) {
        resourceType = "video";
      }
      // ? cloudinary image/video upload code
      const uploadedFile = await cloudinary.v2.uploader.upload(req.file.path, {
        resource_type: resourceType,
      });
      fileUrl = uploadedFile.secure_url;
    }

    if (!message || !userId)
      return res.status(400).json({ err: "Missing Fields" });
    else {
      try {
        const newTweet = await Tweet.create({
          message,
          createdBy: userId,
          fileUrl: req.file ? fileUrl : "",
          fileType: req.file ? resourceType : "",
        });
        res.status(201).json({
          message: "tweet created successfully",
          tweet: newTweet,
        });
      } catch (error) {
        console.log("error creating tweet: ", error);
      }
    }
  } catch (error) {
    console.log("Error creating tweet: ", error);
    return res.status(500).json({ error });
  }
};

export const handleGetTweetWithID = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId)
      .populate({
        path: "createdBy",
        select: "username profileImageUrl",
      })
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username profileImageUrl",
        },
      });
    return res.status(200).json(tweet);
  } catch (error) {
    console.log("Error fetching tweet: ", error);
    return res.status(500).json({ error });
  }
};

export const handleFetchAllTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find()
      .populate({
        path: "createdBy",
        select: "username profileImageUrl",
      })
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username profileImageUrl",
        },
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(tweets);
  } catch (error) {
    console.log("Error fetching tweets: ", error);
    return res.status(500).json({ error });
  }
};

export const handleGetTweetsOfUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tweets = await Tweet.find({ createdBy: userId })
      .populate({
        path: "createdBy",
        select: "username profileImageUrl",
      })
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username profileImageUrl",
        },
      })
      .sort({
        createdAt: -1,
      });
    res.status(200).json(tweets);
  } catch (error) {
    console.log("Error while fetching user tweets", error);
    return res.status(500).json({ error });
  }
};

export const handleTweetUpdation = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { message, userId } = req.body;

    let uploadedFile;
    if (req.file) {
      uploadedFile = await cloudinary.v2.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
    }

    // ? tweet exists and is authorized update
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "tweet was not found" });
    if (userId != tweet.createdBy)
      return res.status(401).json({ err: "Not authorized to make changes" });

    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { message, fileUrl: req.file ? uploadedFile.secure_url : tweet.fileUrl },
      { new: true }
    );
    return res.status(200).json(updatedTweet);
  } catch (error) {
    console.log("Error while updating tweet", error);
    return res.status(500).json({ error });
  }
};

export const handleTweetDeletion = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "tweet was not found" });
    await Tweet.findByIdAndDelete(tweetId).then((deletedTweet) => {
      return res
        .status(200)
        .json({ msg: "successfully deleted tweet", deletedTweet });
    });
  } catch (error) {
    console.log("Error while deleting tweet: ", error);
    return res.status(500).json({ error });
  }
};

export const handleTweetLike = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { userId } = req.body;
    if (!tweetId || !userId)
      return res.status(400).json({ error: "Missing Fields" });

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "No such tweet" });

    if (tweet.likes.includes(userId)) {
      return res.status(400).json({ err: "already-liked" });
    }

    if (tweet.dislikes.includes(userId)) {
      return res.status(400).json({ err: "user-in-disliked" });
    }

    tweet.likes.push(userId);

    await tweet.save();

    res.status(200).json({ msg: "liked the tweet" });
  } catch (error) {
    console.log("Error while liking tweet: ", error);
    return res.status(500).json({ error });
  }
};
export const handleTweetDislike = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { userId } = req.body;
    if (!tweetId || !userId)
      return res.status(400).json({ error: "Missing Fields" });

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "No such tweet" });

    if (tweet.dislikes.includes(userId)) {
      return res.status(400).json({ err: "already-disliked" });
    }

    if (tweet.likes.includes(userId)) {
      return res.status(400).json({ err: "user-in-liked" });
    }

    tweet.dislikes.push(userId);

    await tweet.save();

    res.status(200).json({ msg: "disliked the tweet" });
  } catch (error) {
    console.log("Error while disliking tweet: ", error);
    return res.status(500).json({ error });
  }
};

export const handleRemoveFromLikes = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { userId } = req.body;
    if (!tweetId || !userId)
      return res.status(400).json({ error: "Missing Fields" });

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "No such tweet" });

    if (!tweet.likes.includes(userId)) {
      return res.status(400).json({ err: "not-liked" });
    }

    tweet.likes = tweet.likes.filter((id) => id.toString() !== userId);
    await tweet.save();

    return res.status(200).json({ msg: "removed like" });
  } catch (error) {
    console.log("Error while removing from likes: ", error);
    return res.status(500).json({ error });
  }
};

export const handleRemoveFromDislikes = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const { userId } = req.body;
    if (!tweetId || !userId)
      return res.status(400).json({ error: "Missing Fields" });

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "No such tweet" });

    if (!tweet.dislikes.includes(userId)) {
      return res.status(400).json({ err: "not-dislike" });
    }

    tweet.dislikes = tweet.dislikes.filter((id) => id.toString() !== userId);
    await tweet.save();

    return res.status(200).json({ msg: "removed dislike" });
  } catch (error) {
    console.log("Error while removing from dislikes: ", error);
    return res.status(500).json({ error });
  }
};
