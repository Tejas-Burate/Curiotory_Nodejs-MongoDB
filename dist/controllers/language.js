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
exports.getDataTableForLanguageList = exports.deleteLanguageByLanguageId = exports.createLanguage = exports.uploadImage = exports.upload = exports.getDropdownLanguageList = exports.getAllLanguageList = void 0;
const language_1 = __importDefault(require("../models/language"));
const multer_1 = __importDefault(require("multer"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getAllLanguageList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languageData = yield language_1.default.find();
        if (languageData.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "User Data Not Found" });
        }
        res.status(200).json(languageData);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllLanguageList = getAllLanguageList;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/language");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
const uploadImage = (req, res) => {
    try {
        const files = req.files; // Explicitly type files as an array of Multer files
        console.log("files", files);
        const image = [];
        if (!files || files.length === 0) {
            res
                .status(400)
                .json({ status: 400, error: "400", message: "No file uploaded" });
        }
        else {
            files.forEach((file) => {
                const imageUrl = `${req.protocol}://${req.get("host")}/images/language/${file.filename}`;
                console.log("imageUrl", imageUrl);
                image.push(imageUrl);
            });
            res.status(200).json({
                status: 200,
                error: "success",
                message: "imageUrl created",
                image,
            });
        }
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
};
exports.uploadImage = uploadImage;
const createLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { languageLevelImage, languageSubscriptionImage, languageFlagImage, languageMeetingImage, languageHomeImage, name, } = req.body;
    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
    try {
        const languageData = yield language_1.default.create({
            languageName: name,
            languageObj: {
                languageMeetingImage: languageMeetingImage,
                languageFlagImage: languageFlagImage,
                languageSubscriptionImage: languageSubscriptionImage,
                languageLevelImage: languageLevelImage,
                // You can add other properties here if needed
            },
            languageImage: languageMeetingImage,
            dateCreated: currentDate,
            dateModified: currentDate,
        });
        res.status(200).json(languageData);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.createLanguage = createLanguage;
const getDropdownLanguageList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languages = yield language_1.default.find({}, { languageName: 1 });
        if (languages.length === 0) {
            return res.status(404).json({
                status: 404,
                error: "404",
                message: "Languages Data Not Found",
            });
        }
        res.status(200).json(languages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "500",
            message: "Internal Server Error",
        });
    }
});
exports.getDropdownLanguageList = getDropdownLanguageList;
const deleteLanguageByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const language = yield language_1.default.findOne({ _id: id });
        if (!language) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Language of ID ${id} is not found `,
            });
            return;
        }
        const updateLanguage = yield language_1.default.findByIdAndDelete(id);
        if (!updateLanguage) {
            res.status(400).json({
                Status: 400,
                error: "400",
                message: "Failed to Delete Language",
            });
            return;
        }
        res.status(200).json({ message: "Language deleted successfully" });
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
exports.deleteLanguageByLanguageId = deleteLanguageByLanguageId;
const getDataTableForLanguageList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, length, start, order } = req.body;
    const recordPerPage = length;
    const searchData = search.value;
    let searchQuery = {};
    if (searchData) {
        // Create a MongoDB regex query for case-insensitive search
        searchQuery = {
            languageName: { $regex: new RegExp(searchData, "i") },
        };
    }
    try {
        // Find total records matching the search criteria
        const totalRecords = yield language_1.default.countDocuments(searchQuery);
        // Calculate the total number of pages
        const totalPage = Math.ceil(totalRecords / length);
        // Define the sorting order
        const sortColumnIndex = order[0].column;
        const sortColumnDir = order[0].dir;
        let sort = {};
        // Determine the field to sort based on sortColumnIndex
        switch (sortColumnIndex) {
            case 0:
                sort = { languageName: sortColumnDir === "asc" ? 1 : -1 };
                break;
            // Add more cases for other sortable fields if needed
            default:
                // If no valid sortColumnIndex is provided, you can set a default sorting option here.
                sort = { createdAt: 1 }; // Sort by createdAt in ascending order
                break;
        }
        // Define the MongoDB aggregation pipeline for pagination and sorting
        const pipeline = [
            { $match: searchQuery },
            { $sort: sort },
            { $skip: Number(start) },
            { $limit: Number(length) },
        ];
        // Execute the aggregation pipeline
        const lang = yield language_1.default.aggregate(pipeline);
        // Prepare the response data
        const result = {
            data: lang.map((l) => ({
                languageId: l.languageId,
                languageName: l.languageName,
                languageObj: l.languageObj,
                languageImage: l.languageImage,
            })),
        };
        res.status(200).json({
            recordPerPage,
            recordsTotal: totalRecords.toString(),
            recordsFiltered: totalRecords.toString(),
            totalPages: totalPage.toString(),
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getDataTableForLanguageList = getDataTableForLanguageList;
