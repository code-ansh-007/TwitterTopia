import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const handleUserSignUp = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
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
        const user = new User({ username, password });
        bcrypt.hash(confirmPassword, 10, (err, hashedPassword) => {
          user.set("password", hashedPassword);
          user.save();
          next();
        });
        return res.status(200).send("User created Successfully");
      }
    }
  } catch (error) {
    console.log("error while fetching signUp route: ", error);
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
    console.log("error while fetching signIn route: ", error);
  }
};
