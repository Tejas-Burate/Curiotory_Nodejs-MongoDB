import Plan from "../models/plan";
import { Request, Response } from "express";

const getAllPlanList = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find();

    if (plans.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Plan data not found" });
      return;
    }
    res.status(200).json(plans);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

// const getPlansByLanguageId = async (req: Request, res, Response) => {
//   try {
//     const { user };
//   } catch (error) {
//     console.log("error", error);
//     res
//       .status(500)
//       .json({ status: 500, error: "500", message: "Internal Server Error" });
//   }
// };

const getDataTableForPlanList = async (req: Request, res: Response) => {
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
      $or: [{ planName: regex }],
    };
  }

  const totalRecords = await Plan.countDocuments(searchQuery);
  const totalPages = Math.ceil(totalRecords / length);

  let query = Plan.find(searchQuery).skip(start).limit(length);

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

  const result = await query;

  res.status(200).json({
    recordPerPage,
    recordsTotal: totalRecords,
    recordsFiltered: totalRecords,
    totalPages,
    data: result,
  });
};

export { getAllPlanList, getDataTableForPlanList };
