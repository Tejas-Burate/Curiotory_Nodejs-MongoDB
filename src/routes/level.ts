import express from "express";
import {
  getAllLanguages,
  createLevel,
  // getLevelsByLevelId,
  getAllLevelsByLanguageId,
  updateLevelByLevelId,
  deleteLevelByLevelId,
  getDataTableForLevelList,
} from "../controllers/level";

const router = express.Router();

router.get("/getAllLanguages", getAllLanguages);
router.post("/createLevel", createLevel);
// router.get("/getLevelsByLevelId/:id", getLevelsByLevelId);
router.get("/getAllLevelsByLanguageId/:id", getAllLevelsByLanguageId);
router.put("/updateLevelByLevelId/:id", updateLevelByLevelId);
router.delete("/deleteLevelByLevelId/:id", deleteLevelByLevelId);
router.post("/getDataTableForLevelList", getDataTableForLevelList);

export default router;
