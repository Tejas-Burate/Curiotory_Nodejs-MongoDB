import express from "express";
import {
  getAllQuestionList,
  editOptionsByQuestionId,
  updateQuestionByQuestionId,
} from "../controllers/question";

const router = express.Router();

router.get("/getAllQuestionList", getAllQuestionList);
router.post("/editOptionsByQuestionId", editOptionsByQuestionId);
router.put("/updateQuestionByQuestionId/:id", updateQuestionByQuestionId);

export default router;
