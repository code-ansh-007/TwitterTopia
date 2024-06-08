import e from "express";

const router = e.Router();

router.get("/", (req, res) => {
  return res.send("Welcome to your tweet");
});

export default router;
