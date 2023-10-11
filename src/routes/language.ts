import express from "express";
import {
  getAllLanguageList,
  getDropdownLanguageList,
  upload,
  uploadImage,
  createLanguage,
  getDataTableForLanguageList,
  deleteLanguageByLanguageId,
} from "../controllers/language";

const router = express.Router();

router.get("/getAllLanguageList", getAllLanguageList);
router.get("/getDropdownLanguageList", getDropdownLanguageList);
router.post("/uploadImage", upload.array("imageFile"), uploadImage);
router.post("/createLanguage", createLanguage);
router.delete("/deleteLanguageByLanguageId/:id", deleteLanguageByLanguageId);
router.post("/getDataTableForLanguageList", getDataTableForLanguageList);

export default router;
