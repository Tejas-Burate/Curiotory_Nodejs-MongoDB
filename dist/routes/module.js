"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_1 = require("../controllers/module");
const router = express_1.default.Router();
router.post("/createModule", module_1.createModule);
router.get("/getAllModuleList", module_1.getAllModuleList);
router.get("/getModuleByLessonId/:id", module_1.getModuleByLessonId);
router.get("/getModuleByModuleId/:id", module_1.getModuleByModuleId);
router.put("/updateModuleByModuleId/:id", module_1.updateModuleByModuleId);
router.post("/getDataTableForModuleList", module_1.getDataTableForModuleList);
exports.default = router;
