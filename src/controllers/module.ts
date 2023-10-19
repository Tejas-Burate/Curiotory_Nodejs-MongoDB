import express from "express";
import Module from "../models/module";
import Language from "../models/language";
import moment from "moment-timezone";
import { Request, Response } from "express";
import Level from "../models/level";
import Lesson from "../models/lesson";

const createModule = async (req: Request, res: Response) => {
  try {
    const { languageId, levelId, lessonId } = req.body;

    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const language = await Language.findById(languageId);
    const level = await Level.findById(levelId);
    const lesson = await Lesson.findById(lessonId);

    if (!language) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Language of ID ${languageId} is not found`,
      });
      return;
    }

    if (!level) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Level of ID ${levelId} is not found`,
      });
      return;
    }

    if (!lesson) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Lesson of ID ${lessonId} is not found`,
      });
      return;
    }

    const module = await Module.create({
      ...req.body,
      dateCreated: currentDate,
      dateModified: currentDate,
    });

    if (!module) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create new module..",
      });
      return;
    }

    res.status(200).json(module);
  } catch (error: any) {
    console.error("error", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "Internal Server Error",
    });
  }
};

const getAllModuleList = async (req: Request, res: Response) => {
  try {
    const module = await Module.find();

    if (module.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Module data not found" });
      return;
    }

    res.status(200).json(module);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getModuleByLessonId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const module = await Module.find({ lessonId: id });

    if (module.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Module of Lesson Id ${id} is not found`,
      });
      return;
    }

    res.status(200).json(module);
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getModuleByModuleId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const module = await Module.find({ _id: id });

    if (module.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Module of Module Id ${id} is not found`,
      });
      return;
    }

    res.status(200).json(module);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const updateModuleByModuleId = async (req: Request, res: Response) => {
  try {
    // const {lessons} = req.body;
    const id = req.params.id;

    const module = await Module.findOne({ _id: id });

    if (!module) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `module of module ID ${id} is not found`,
      });
      return;
    }

    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const moduleUpdate = await Module.findByIdAndUpdate(
      id,
      {
        ...req.body,
        dateModified: currentDate,
      },
      {
        new: true,
      }
    );

    if (!moduleUpdate) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to update Test",
      });
      return;
    }

    res.status(200).json(moduleUpdate);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal Server Error",
    });
  }
};

const getDataTableForModuleList = async (req: Request, res: Response) => {
  try {
    const { search, length, start, page, order } = req.body;

    const recordPerPage = length;
    const searchData = search.value;
    let searchQuery = {};

    if (searchData) {
      const regex = new RegExp(searchData, "i");

      searchQuery = {
        $or: [
          { moduleName: regex },
          { difficultyLevel: regex },
          { examMode: regex },
        ],
      };
    }

    const totalRecords = await Module.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalRecords / length);

    let query = Module.find(searchQuery).skip(start).limit(length);

    const sortColumnIndex = order[0].column;
    const sortColumnDir = order[0].dir;

    let sort: { [key: string]: "asc" | "desc" } = {};

    switch (sortColumnIndex) {
      case 0:
        sort = { moduleName: sortColumnDir };
        break;
      case 1:
        sort = { difficultyLevel: sortColumnDir };
        break;
      default:
        sort = { dateCreated: "asc" };
        break;
    }

    query = query.sort(sort);

    query = query.populate("levelId", "levelName");
    query = query.populate("languageId", "languageName");
    query = query.populate("lessonId", "lessonName");

    const result = await query.exec();

    const responseData = result.map((module) => {
      return {
        _id: module._id,
        language: module.languageId,
        level: module.levelId,
        lesson: module.lessonId,
        moduleName: module.moduleName,
        numberOfQuestions: module.numberOfQuestions,
        difficultyLevel: module.difficultyLevel,
        examMode: module.examMode,
        dateCreated: module.dateCreated,
        dateModified: module.dateModified,
      };
    });

    res.status(200).json({ totalRecords, totalPages, result: responseData });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

export {
  createModule,
  getAllModuleList,
  getModuleByLessonId,
  getModuleByModuleId,
  updateModuleByModuleId,
  getDataTableForModuleList,
};
