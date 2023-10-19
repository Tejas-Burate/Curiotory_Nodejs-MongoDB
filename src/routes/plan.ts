import express from "express";
import {
  getAllPlanList,
  getPlansByLanguageId,
  getDataTableForPlanList,
} from "../controllers/plan";

const router = express.Router();

router.get("/getAllPlanList", getAllPlanList);
router.post("/getDataTableForPlanList", getDataTableForPlanList);
router.post("/getPlansByLanguageId", getPlansByLanguageId);

export default router;
