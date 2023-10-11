import { Request, Response } from "express";
import mongoose from "mongoose";
import Language from "../models/language";
import multer from "multer";
import moment from "moment-timezone";

const getAllLanguageList = async (req: Request, res: Response) => {
  try {
    const languageData = await Language.find();

    if (languageData.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "User Data Not Found" });
    }
    res.status(200).json(languageData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/language");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadImage = (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]; // Explicitly type files as an array of Multer files
    console.log("files", files);
    const image: string[] = [];

    if (!files || files.length === 0) {
      res
        .status(400)
        .json({ status: 400, error: "400", message: "No file uploaded" });
    } else {
      files.forEach((file: Express.Multer.File) => {
        const imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/images/language/${file.filename}`;
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
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const createLanguage = async (req: Request, res: Response) => {
  const {
    languageLevelImage,
    languageSubscriptionImage,
    languageFlagImage,
    languageMeetingImage,
    languageHomeImage,
    name,
  } = req.body;

  const timezone = process.env.TIMEZONE || "Asia/Kolkata";
  const currentDate = new Date();
  const utcOffset = moment.tz(timezone).utcOffset();
  currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

  try {
    const languageData = await Language.create({
      languageName: name,
      languageObj: {
        languageMeetingImage: languageMeetingImage,
        languageFlagImage: languageFlagImage,
        languageSubscriptionImage: languageSubscriptionImage,
        languageLevelImage: languageLevelImage,
        // You can add other properties here if needed
      },
      languageImage: languageMeetingImage, // You can change this based on your requirements
      dateCreated: currentDate,
      dateModified: currentDate,
    });

    res.status(200).json(languageData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getDropdownLanguageList = async (req: Request, res: Response) => {
  try {
    const languages = await Language.find({}, { languageName: 1 });

    if (languages.length === 0) {
      return res.status(404).json({
        status: 404,
        error: "404",
        message: "Languages Data Not Found",
      });
    }

    res.status(200).json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal Server Error",
    });
  }
};

const deleteLanguageByLanguageId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const language = await Language.findOne({ _id: id });
    if (!language) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Language of ID ${id} is not found `,
      });
      return;
    }

    const updateLanguage = await Language.findByIdAndDelete(id);
    if (!updateLanguage) {
      res.status(400).json({
        Status: 400,
        error: "400",
        message: "Failed to Delete Language",
      });
      return;
    }

    res.status(200).json({ message: "Language deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the level.",
    });
  }
};

const getDataTableForLanguageList = async (req: Request, res: Response) => {
  const { search, length, start, order } = req.body;
  const recordPerPage = length;
  const searchData = search.value;
  let searchQuery: any = {};

  if (searchData) {
    // Create a MongoDB regex query for case-insensitive search
    searchQuery = {
      languageName: { $regex: new RegExp(searchData, "i") },
    };
  }

  try {
    // Find total records matching the search criteria
    const totalRecords = await Language.countDocuments(searchQuery);

    // Calculate the total number of pages
    const totalPage = Math.ceil(totalRecords / length);

    // Define the sorting order
    const sortColumnIndex = order[0].column;
    const sortColumnDir = order[0].dir;
    let sort: any = {};

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
    const lang = await Language.aggregate(pipeline);

    // Prepare the response data
    const result = {
      data: lang.map((l: any) => ({
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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export {
  getAllLanguageList,
  getDropdownLanguageList,
  upload, // Uncomment to enable multer file upload
  uploadImage, // Uncomment to enable multer file upload
  createLanguage,
  deleteLanguageByLanguageId,
  getDataTableForLanguageList,
};
