import express from "express";
import {
  getAllLessons,
  getAllLessonsByLevelId,
  updateLessonByLessonId,
  getDataTableForLessonList,
} from "../controllers/lesson";

const router = express.Router();

router.get("/getAllLessonsByLevelId/:id", getAllLessonsByLevelId);
router.get("/getAllLessons", getAllLessons);
router.put("/updateLessonByLessonId/:id", updateLessonByLessonId);
router.post("/getDataTableForLessonList", getDataTableForLessonList);

export default router;
