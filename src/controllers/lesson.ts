import Lesson from "../models/lesson";
import User from "../models/user";
import Language from "../models/language";
import Level from "../models/level";
import moment from "moment-timezone";
// import { ObjectId } from "mongoose";
import mongoose from "mongoose";
const { ObjectId } = require("mongoose").Types;
import { Request, Response } from "express";

const createLesson = async (req: Request, res: Response) => {
  try {
    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const lesson = await Lesson.create({
      ...req.body,
      dateCreated: currentDate,
      dateModified: currentDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the level.",
    });
  }
};

const getAllLessons = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.find();

    if (lesson.length === 0) {
      res
        .status(404)
        .json({ Status: 404, error: "404", message: "Lessons not found" });
      return;
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the level.",
    });
  }
};

const getAllLessonsByLevelId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("id", id);

    const lesson = await Lesson.find({ levelId: id }, { lessonName: 1 });
    if (lesson.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Lesson of given LevelId ${id} is not found`,
      });
      return;
    }
    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal Server Error",
    });
  }
};

const updateLessonByLessonId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    // Use findByIdAndUpdate to update the lesson by ID
    const lesson = await Lesson.findByIdAndUpdate(
      id,
      { ...req.body, dateModified: currentDate },
      { new: true } // Return the updated lesson
    );

    if (!lesson) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: `Lesson with ID ${id} not found`,
      });
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the lesson.",
    });
  }
};

const getDataTableForLessonList = async (req: Request, res: Response) => {
  const { search, length, start, order } = req.body;

  const recordPerPage = length;
  const searchData = search.value;

  try {
    let query = Lesson.find();

    if (searchData) {
      const regex = new RegExp(searchData, "i");
      query.or([
        { lessonName: regex },
        { status: regex },
        { lessonDescription: regex },
      ]);
    }

    // Use aggregate or other query methods as needed
    // Make sure the query is not executed implicitly in multiple places

    const totalRecords = await query.countDocuments();
    const totalPages = Math.ceil(totalRecords / length);

    query.sort({
      [order[0].column]: order[0].dir === "asc" ? 1 : -1,
    });

    query.skip(start).limit(length);

    // Execute the query using .exec() or other appropriate method
    const result = await query.exec();

    const formattedResult = result.map((lesson) => ({
      languageId: lesson.languageId,
      userId: lesson.userId?._id, // Use optional chaining here
      lessonName: lesson.lessonName,
      status: lesson.status,
      lessonDescription: lesson.lessonDescription,
      user: {
        userId: lesson.userId?._id, // Optional chaining
        // username: lesson.userId?.fullName, // Optional chaining
      },
    }));

    res.status(200).json({
      recordPerPage,
      recordsTotal: totalRecords,
      recordsFiltered: totalRecords,
      totalPages,
      data: formattedResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while fetching data.",
    });
  }
};

export {
  createLesson,
  getAllLessons,
  getAllLessonsByLevelId,
  updateLessonByLessonId,
  getDataTableForLessonList,
};
