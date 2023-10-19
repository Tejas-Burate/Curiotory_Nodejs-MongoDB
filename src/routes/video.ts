import express from "express";
import {
  getAllVideoList,
  getVideoListByLevelId,
  createVideo,
} from "../controllers/video";

const router = express.Router();

router.get("/getAllVideoList", getAllVideoList);
router.get("/getVideoListByLevelId/:id", getVideoListByLevelId);
router.post("/createVideo", createVideo);

export default router;
