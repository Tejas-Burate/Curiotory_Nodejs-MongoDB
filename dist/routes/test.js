"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = require("../controllers/test");
const router = express_1.default.Router();
router.get("/getTestList", test_1.getTestList);
router.get("/getTestByTestId/:id", test_1.getTestByTestId);
router.get("/getTestListByLanguageId/:id", test_1.getTestListByLanguageId);
router.put("/updateTestByTestId/:id", test_1.updateTestByTestId);
exports.default = router;
