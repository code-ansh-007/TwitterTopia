import e from "express";
import { handleUserLogin, handleUserSignUp } from "../controllers/user.js";

const router = e.Router();

router.get("/", (req, res) => {
  return res.send("Welcome to your profile");
});

// ? Signup route
router.post("/register", handleUserSignUp);

router.post("/login", handleUserLogin);

export default router;
