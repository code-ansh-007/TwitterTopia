import e from "express";
import {
  handleFetchAllUsers,
  handleFetchSingleUser,
  handleFollow,
  handleUnfollow,
  handleUserLogin,
  handleUserSignUp,
} from "../controllers/user.js";
import upload from "../middlewares/multer.js";

const router = e.Router();

// ? FETCH ALL THE USERS
router.get("/", handleFetchAllUsers);

// ! FETCH A SINGLE USER
router.get("/:userId", handleFetchSingleUser);

// ? SIGNUP ROUTE
router.post("/register", upload.single("file"), handleUserSignUp);

// ? LOGIN ROUTE
router.post("/login", handleUserLogin);

// ? FOLLOW A USER ROUTE
router.post("/:userId/follow", handleFollow);

// ? UNFOLLOW A USER ROUTE
router.post("/:userId/unfollow", handleUnfollow);

export default router;
