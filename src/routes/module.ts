import express from "express";
import {
  getAllModuleList,
  getModuleByLessonId,
  getModuleByModuleId,
  updateModuleByModuleId,
  createModule,
  getDataTableForModuleList,
} from "../controllers/module";

const router = express.Router();

router.post("/createModule", createModule);
router.get("/getAllModuleList", getAllModuleList);
router.get("/getModuleByLessonId/:id", getModuleByLessonId);
router.get("/getModuleByModuleId/:id", getModuleByModuleId);
router.put("/updateModuleByModuleId/:id", updateModuleByModuleId);
router.post("/getDataTableForModuleList", getDataTableForModuleList);

export default router;
