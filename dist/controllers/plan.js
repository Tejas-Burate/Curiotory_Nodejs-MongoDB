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
exports.getDataTableForPlanList = exports.getPlansByLanguageId = exports.getAllPlanList = void 0;
const user_1 = __importDefault(require("../models/user"));
const plan_1 = __importDefault(require("../models/plan"));
const getAllPlanList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield plan_1.default.find();
        if (plans.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Plan data not found" });
            return;
        }
        res.status(200).json(plans);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllPlanList = getAllPlanList;
const getPlansByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `User of userId ${userId} is not found`,
            });
            return;
        }
        const userLanguageId = user.languageId;
        console.log("userLanguageId", userLanguageId);
        const plan = yield plan_1.default.find({
            languageId: user.languageId,
        });
        console.log("plan", plan);
        if (plan.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Plan of languageId ${user.languageId} is not found`,
            });
            return;
        }
        res.status(200).json(plan);
        console.log("user", user);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getPlansByLanguageId = getPlansByLanguageId;
const getDataTableForPlanList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, length, start, order } = req.body;
    // const userId = req.params.id; // Extract restaurant ID from the URL parameter
    // console.log("userId", userId);
    const recordPerPage = length;
    const searchData = search.value;
    let sort;
    let searchQuery = {}; // Initialize searchQuery as an empty object
    if (searchData) {
        const regex = new RegExp(searchData, "i");
        searchQuery = Object.assign(Object.assign({}, searchQuery), { $or: [{ planName: regex }] });
    }
    const totalRecords = yield plan_1.default.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalRecords / length);
    let query = plan_1.default.find(searchQuery).skip(start).limit(length);
    // Add sorting logic if required
    const sortColumnIndex = order[0].column;
    const sortColumnDir = order[0].dir;
    switch (sortColumnIndex) {
        case 0:
            sort = { planName: sortColumnDir };
            break;
        case 1:
            sort = { planPrice: sortColumnDir };
            break;
        case 2:
            sort = { planDuration: sortColumnDir };
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
exports.getDataTableForPlanList = getDataTableForPlanList;
