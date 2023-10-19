import express from "express";
import {
  getAllJitsiMeeting,
  deleteMeetingByMeetingId,
} from "../controllers/meeting";
const router = express.Router();

router.get("/getAllJitsiMeeting", getAllJitsiMeeting);
router.delete("/deleteMeetingByMeetingId", deleteMeetingByMeetingId);

export default router;
