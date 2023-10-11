import express from "express";
import { getAllLessons } from "../controllers/lesson";

const router = express.Router();

router.get("/getAllLessons", getAllLessons);

export default router;
