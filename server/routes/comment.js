import e from "express";
import {
  handleCommentCreation,
  handleCommentDeletion,
} from "../controllers/comment.js";

const router = e.Router();

// ? CREATE A COMMENT
router.post("/create", handleCommentCreation);

// ? DELETE A COMMENT
router.delete("/delete", handleCommentDeletion);

export default router;
