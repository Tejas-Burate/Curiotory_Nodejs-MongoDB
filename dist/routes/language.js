"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const language_1 = require("../controllers/language");
const router = express_1.default.Router();
router.get("/getAllLanguageList", language_1.getAllLanguageList);
router.get("/getDropdownLanguageList", language_1.getDropdownLanguageList);
router.post("/uploadImage", language_1.upload.array("imageFile"), language_1.uploadImage);
router.post("/getLanguageByLanguageId", language_1.getLanguageByLanguageId);
router.post("/createLanguage", language_1.createLanguage);
router.delete("/deleteLanguageByLanguageId/:id", language_1.deleteLanguageByLanguageId);
router.post("/getDataTableForLanguageList", language_1.getDataTableForLanguageList);
exports.default = router;
