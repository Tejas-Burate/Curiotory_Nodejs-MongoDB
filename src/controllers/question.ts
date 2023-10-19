import express from "express";
import Question from "../models/question";
import Language from "../models/language";
import Lesson from "../models/lesson";
import Level from "../models/level";
import moment from "moment-timezone";
import { Request, Response } from "express";

const getAllQuestionList = async (req: Request, res: Response) => {
  try {
    const result = await Question.aggregate([
      {
        $lookup: {
          from: "languages", // Replace with the actual name of the "languages" collection
          localField: "languageId",
          foreignField: "_id",
          as: "language",
        },
      },
      {
        $lookup: {
          from: "levels", // Replace with the actual name of the "levels" collection
          localField: "levelId",
          foreignField: "_id",
          as: "level",
        },
      },
      {
        $lookup: {
          from: "lessons", // Replace with the actual name of the "lessons" collection
          localField: "lessonId",
          foreignField: "_id",
          as: "lesson",
        },
      },
      {
        $unwind: "$language",
      },
      {
        $unwind: "$level",
      },
      {
        $unwind: "$lesson",
      },
      {
        $project: {
          questionId: "$_id",
          optionList: 1,
          language: {
            _id: "$language._id",
            languageName: "$language.languageName",
          },
          level: {
            _id: "$level._id",
            levelName: "$level.levelName",
          },
          lesson: {
            _id: "$lesson._id",
            lessonName: "$lesson.lessonName",
          },
          question: 1,
          solution: 1,
          difficultyLevel: 1,
          isActive: 1,
        },
      },
    ]);

    if (!result || result.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: "Questions not found",
      });
      return;
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the level.",
    });
  }
};

interface Option {
  optionValue: string;
  optionId: string;
  isCorrect: boolean;
  isActive: string; // Define isActive as a string
}

const editOptionsByQuestionId = async (req: Request, res: Response) => {
  try {
    // const { questionId, options } = req.body;
    // // Map the 'options' array to the correct structure
    // const arr: Option[] = options.map((o: Option) => ({
    //   optionValue: o.optionValue,
    //   optionId: o.optionId,
    //   isCorrect: o.isCorrect,
    //   isActive: "1", // Ensure isActive is a string
    // }));
    // const question = await Question.findOne({ _id: questionId });
    // if (question) {
    //   question.optionList = arr;
    //   await question.save();
    //   const success = "Success";
    //   res.json(success);
    // } else {
    //   const error = "Question not found";
    //   res.status(400).json(error);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const updateQuestionByQuestionId = async (req: Request, res: Response) => {
  try {
    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const id = req.params.id;

    // Use findByIdAndUpdate with the correct syntax
    const qts = await Question.findByIdAndUpdate(
      id,
      { ...req.body, dateModified: currentDate },
      { new: true }
    );

    if (!qts) {
      res.status(400).json({
        status: 400,
        error: "404",
        message: `Failed to update Question of Id ${id}`,
      });
      return;
    }

    res.status(201).json(qts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export {
  getAllQuestionList,
  editOptionsByQuestionId,
  updateQuestionByQuestionId,
};
