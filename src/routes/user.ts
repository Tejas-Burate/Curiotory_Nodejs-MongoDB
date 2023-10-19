import express from "express";
import {
  getUserDetails,
  getAllUserByLanguageId,
  getTeachersList,
  getAllTeacherByLanguageId,
  editProfileData,
} from "../controllers/user";

const router = express.Router();

router.get("/getUserDetails", getUserDetails);
router.get("/getAllUserByLanguageId/:id", getAllUserByLanguageId);
router.get("/getTeachersList", getTeachersList);
router.get("/getAllTeacherByLanguageId/:id", getAllTeacherByLanguageId);
router.put("/editProfileData", editProfileData);
export default router;
