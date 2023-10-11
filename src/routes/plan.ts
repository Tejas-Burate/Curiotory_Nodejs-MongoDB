import express from "express";
import { getAllPlanList, getDataTableForPlanList } from "../controllers/plan";

const router = express.Router();

router.get("/getAllPlanList", getAllPlanList);
router.post("/getDataTableForPlanList", getDataTableForPlanList);

export default router;
