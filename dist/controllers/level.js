"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataTableForLevelList = exports.deleteLevelByLevelId = exports.updateLevelByLevelId = exports.getAllLevelsByLanguageId = exports.createLevel = exports.getAllLanguages = void 0;
const level_1 = __importDefault(require("../models/level"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const timezone = process.env.TIMEZONE || "Asia/Kolkata";
const currentDate = new Date();
const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
const createLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { levelName, languageId } = req.body;
        const level = yield level_1.default.create({
            levelName,
            languageId,
            dateModified: Date.now(),
            dateCreated: Date.now(),
        });
        if (!level) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: "Unable to create new Level",
            });
        }
        res.status(201).json(level);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.createLevel = createLevel;
// const isPurchased = async (userId, levelId, languageId) => {
//   try {
//     let isPurchased = false;
//     const getOrders = await Order.find({ userId });
//     if (getOrders) {
//       for (const g of getOrders) {
//         if (g.status === "paid") {
//           const planId = g.planId;
//           const planObj = await Plan.findOne({
//             planId,
//             languageId,
//             isLivePlan: "0",
//           });
//           if (planObj) {
//             const levels = JSON.parse(planObj.levels);
//             for (const l of levels) {
//               if (l === levelId) {
//                 const now = new Date();
//                 const endDate = new Date(now);
//                 endDate.setDate(
//                   endDate.getDate() + parseInt(planObj.planDuration)
//                 );
//                 if (now < endDate) {
//                   isPurchased = true;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     return isPurchased;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Internal Server Error");
//   }
// };
// Usage
// const userId = "yourUserId";
// const levelId = "yourLevelId";
// const languageId = "yourLanguageId";
// isPurchased(userId, levelId, languageId)
//   .then((result) => {
//     console.log("Is Purchased:", result);
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });
const getLevelsByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
const getAllLanguages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const level = yield level_1.default.find();
        if (level.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Languages not found" });
        }
        res.status(200).json(level);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllLanguages = getAllLanguages;
const getAllLevelsByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("id", id);
        // Find levels with the specified languageId
        const levels = yield level_1.default.find({ languageId: id });
        console.log("levels", levels);
        if (levels.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: "Level of the given languageId is not found",
            });
            return;
        }
        res.status(200).json(levels);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllLevelsByLanguageId = getAllLevelsByLanguageId;
const updateLevelByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const existingLevel = yield level_1.default.findOne({ _id: id });
        if (!existingLevel) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: "Level Id not found",
            });
        }
        // Update the level with the new data
        const updatedLevel = yield level_1.default.findByIdAndUpdate({ _id: id }, Object.assign(Object.assign({}, req.body), { dateModified: currentDate }), { new: true } // This option returns the updated document
        );
        if (!updatedLevel) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: `Unable to update level of id ${id}`,
            });
        }
        // Return the updated level
        res.status(200).json(updatedLevel);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the level.",
        });
    }
});
exports.updateLevelByLevelId = updateLevelByLevelId;
const deleteLevelByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const level = yield level_1.default.findOne({ _id: id });
        if (!level) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Level of ID ${id} is not found `,
            });
            return;
        }
        const updateLevel = yield level_1.default.findByIdAndDelete(id);
        if (!updateLevel) {
            res
                .status(400)
                .json({ Status: 400, error: "400", message: "Failed to Delete Level" });
            return;
        }
        res.status(200).json({ message: "Level deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the level.",
        });
    }
});
exports.deleteLevelByLevelId = deleteLevelByLevelId;
const getDataTableForLevelList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, length, start, order } = req.body;
    // const userId = req.params.id; // Extract restaurant ID from the URL parameter
    // console.log("userId", userId);
    const recordPerPage = length;
    const searchData = search.value;
    let sort;
    let searchQuery = {}; // Initialize searchQuery as an empty object
    if (searchData) {
        const regex = new RegExp(searchData, "i");
        searchQuery = Object.assign(Object.assign({}, searchQuery), { $or: [{ levelName: regex }] });
    }
    const totalRecords = yield level_1.default.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalRecords / length);
    let query = level_1.default.find(searchQuery).skip(start).limit(length);
    // Add sorting logic if required
    const sortColumnIndex = order[0].column;
    const sortColumnDir = order[0].dir;
    switch (sortColumnIndex) {
        case 0:
            sort = { levelName: sortColumnDir };
            break;
        default:
            // If no valid sortColumnIndex is provided, you can set a default sorting option here.
            sort = { dateModified: "asc" };
            break;
    }
    query = query.sort(sort);
    const result = yield query;
    res.status(200).json({
        recordPerPage,
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        totalPages,
        data: result,
    });
});
exports.getDataTableForLevelList = getDataTableForLevelList;
