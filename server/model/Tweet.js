import mongoose, { model } from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      // ? can be an image or a video
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Tweet = model("Tweet", tweetSchema);
export default Tweet;
