import express from "express";
import { getLiveTestByTestId } from "../controllers/liveTest";

const router = express.Router();

router.get("/getLiveTestByTestId/:id", getLiveTestByTestId);

export default router;
