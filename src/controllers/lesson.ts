import Lesson from "../models/lesson";
import moment from "moment-timezone";
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

export { createLesson, getAllLessons };
