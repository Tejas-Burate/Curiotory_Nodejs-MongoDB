import express from "express";
import {
  getTestList,
  getTestByTestId,
  getTestListByLanguageId,
  updateTestByTestId,
} from "../controllers/test";

const router = express.Router();

router.get("/getTestList", getTestList);
router.get("/getTestByTestId/:id", getTestByTestId);
router.get("/getTestListByLanguageId/:id", getTestListByLanguageId);
router.put("/updateTestByTestId/:id", updateTestByTestId);

export default router;
