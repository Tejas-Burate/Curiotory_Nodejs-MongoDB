import express from "express";
import { Request, Response } from "express";
import Level from "../models/level";
import Language from "../models/language";
import Order from "../models/order";
import Plan from "../models/plan";
import moment from "moment-timezone";

const timezone = process.env.TIMEZONE || "Asia/Kolkata";
const currentDate = new Date();
const utcOffset = moment.tz(timezone).utcOffset();
currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

const createLevel = async (req: Request, res: Response) => {
  try {
    const { levelName, languageId } = req.body;
    const level = await Level.create({
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
  } catch (error) {
    console.log("error", error);

    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

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

const getLevelsByLevelId = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getAllLanguages = async (req: Request, res: Response) => {
  try {
    const level = await Level.find();

    if (level.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Languages not found" });
    }

    res.status(200).json(level);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getAllLevelsByLanguageId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("id", id);

    // Find levels with the specified languageId
    const levels = await Level.find({ languageId: id });

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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const updateLevelByLevelId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const existingLevel = await Level.findOne({ _id: id });

    if (!existingLevel) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: "Level Id not found",
      });
    }

    // Update the level with the new data
    const updatedLevel = await Level.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body, // Include the request body
        dateModified: currentDate, // Set the dateModified field
      },
      { new: true } // This option returns the updated document
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the level.",
    });
  }
};

const deleteLevelByLevelId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const level = await Level.findOne({ _id: id });
    if (!level) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Level of ID ${id} is not found `,
      });
      return;
    }

    const updateLevel = await Level.findByIdAndDelete(id);
    if (!updateLevel) {
      res
        .status(400)
        .json({ Status: 400, error: "400", message: "Failed to Delete Level" });
      return;
    }

    res.status(200).json({ message: "Level deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the level.",
    });
  }
};

const getDataTableForLevelList = async (req: Request, res: Response) => {
  const { search, length, start, order } = req.body;
  // const userId = req.params.id; // Extract restaurant ID from the URL parameter
  // console.log("userId", userId);
  const recordPerPage = length;
  const searchData = search.value;

  let sort: { [key: string]: "asc" | "desc" };
  let searchQuery: { [key: string]: any } = {}; // Initialize searchQuery as an empty object

  if (searchData) {
    const regex = new RegExp(searchData, "i");
    searchQuery = {
      ...searchQuery, // Use the spread operator to merge the current searchQuery
      $or: [{ levelName: regex }],
    };
  }

  const totalRecords = await Level.countDocuments(searchQuery);
  const totalPages = Math.ceil(totalRecords / length);

  let query = Level.find(searchQuery).skip(start).limit(length);

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

  const result = await query;

  res.status(200).json({
    recordPerPage,
    recordsTotal: totalRecords,
    recordsFiltered: totalRecords,
    totalPages,
    data: result,
  });
};

export {
  getAllLanguages,
  createLevel,
  // getLevelsByLevelId,
  getAllLevelsByLanguageId,
  updateLevelByLevelId,
  deleteLevelByLevelId,
  getDataTableForLevelList,
};
