import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cloudinary from "../utils/cloudinaryConfig.js";

export const handleFetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users: ", error);
    return res.status(500).json({ error });
  }
};

export const handleFetchSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ err: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching user: ", error);
    return res.status(500).json({ error });
  }
};

export const handleUserSignUp = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // ? Cloudinary Profile Image Upload (Optional for the user to upload)

    let uploadedFile;
    if (req.file) {
      uploadedFile = await cloudinary.v2.uploader.upload(req.file.path, {
        resource_type: "image",
      });
    }

    if (!username || !password || !confirmPassword)
      return res.status(400).send("fields missing");
    else {
      if (password !== confirmPassword)
        return res
          .status(400)
          .send("password and confirm password do not match");
      const usernameExists = await User.findOne({ username });
      if (usernameExists)
        return res.status(400).send("username already exists");
      else {
        const user = new User({
          username,
          password,
          profileImageUrl: req.file ? uploadedFile.secure_url : "",
        });
        bcrypt.hash(confirmPassword, 10, (err, hashedPassword) => {
          user.set("password", hashedPassword);
          user.save();
          // next();
        });
        return res.status(200).send("User created Successfully");
      }
    }
  } catch (error) {
    console.log("error signing up user: ", error);
    return res.status(500).json({ error });
  }
};

export const handleUserLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("fields missing");
    else {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).send("username or password incorrect");
      else {
        const validateUser = await bcrypt.compare(password, user.password);
        if (!validateUser)
          return res
            .status(400)
            .json({ err: "User email or password is incorrect" });
        const payload = {
          userId: user._id,
          username,
        };
        const secret = process.env.JWT_SECRET;
        // ? storing token in DB
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 172800, // ? 2 days
          },
          async (err, token) => {
            await User.updateOne(
              { _id: user._id },
              {
                $set: { token },
              }
            );
            user.save();
            res.status(200).json({
              user: {
                userId: user._id,
                username,
              },
              token,
            });
          }
        );
      }
    }
  } catch (error) {
    console.log("error logging in user: ", error);
    return res.status(500).json({ error });
  }
};

export const handleFollow = async (req, res, next) => {
  try {
    const { userId } = req.params; // ? User id of user to be followed;
    const { followerId } = req.body; // ? User if of the follower i.e. the logged in user

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ err: "User not found" });

    const follower = await User.findById(followerId);
    if (!follower) return res.status(404).json({ err: "Follower not found" });

    // ? adding the follower to the user's follower array if the user is already not in there
    if (!user.followers.includes(followerId)) {
      user.followers.push(followerId);
      await user.save();
    }

    // ? adding the user to the followers following array if the user is already not in there
    if (!follower.following.includes(userId)) {
      follower.following.push(userId);
      await follower.save();
    }

    return res.status(200).json({ msg: "Successfully followed the user" });
  } catch (error) {
    console.log("Error following user: ", error);
    return res.status(500).json({ error });
  }
};

export const handleUnfollow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { followerId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ err: "User not found" });

    const follower = await User.findById(followerId);
    if (!follower) return res.status(404).json({ err: "Follower not found" });

    user.followers = user.followers.filter(
      (id) => id.toString() !== followerId
    );
    await user.save();

    follower.following = follower.following.filter(
      (id) => id.toString() !== userId
    );
    await follower.save();

    return res.status(200).json({ msg: "Successfully unfollowed the user" });
  } catch (error) {
    console.log("Error unfollowing user: ", error);
    return res.status(500).json({ error });
  }
};
