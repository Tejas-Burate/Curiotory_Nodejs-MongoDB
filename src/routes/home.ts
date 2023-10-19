import express from "express";
import { getDashboardCount } from "../controllers/home";

const router = express.Router();

router.get("/getDashboardCount", getDashboardCount);

export default router;
