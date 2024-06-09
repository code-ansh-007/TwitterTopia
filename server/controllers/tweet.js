import Tweet from "../model/Tweet.js";
import cloudinary from "../utils/cloudinaryConfig.js";

export const handleTweetCreation = async (req, res, next) => {
  try {
    const { message, userId } = req.body;

    let fileUrl;
    if (req.file) {
      let resourceType = "auto";
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

export const handleFetchAllTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find().populate({
      path: "createdBy",
      // select: "username, profileImageUrl",
    });
    return res.status(200).json(tweets);
  } catch (error) {
    console.log("Error fetching tweets: ", error);
    return res.status(500).json({ error });
  }
};

export const handleGetTweetsOfUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tweets = await Tweet.find({ createdBy: userId });
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
