import Tweet from "../model/Tweet.js";

export const handleTweetCreation = async (req, res, next) => {
  try {
    const { message, userId } = req.body;
    if (!message || !userId)
      return res.status(400).json({ err: "Missing Fields" });
    else {
      const tweet = new Tweet({ message, createdBy: userId });
      try {
        const savedTweet = await tweet.save();
        res.status(201).json({
          message: "tweet created successfully",
          tweet: savedTweet,
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
    const tweets = await Tweet.find();
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

    // ? tweet exists and is authorized update
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ err: "tweet was not found" });
    if (userId != tweet.createdBy)
      return res.status(401).json({ err: "Not authorized to make changes" });

    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { message },
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
