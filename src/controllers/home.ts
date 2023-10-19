import express from "express";
import { Request, Response } from "express";
import Language from "../models/language";
import Level from "../models/level";
import Lesson from "../models/lesson";
import Test from "../models/test";
import Module from "../models/module";
import Question from "../models/question";
import Video from "../models/video";
import Plan from "../models/plan";
import User from "../models/user";
import Role from "../models/role";
import Order from "../models/order";
import Meeting from "../models/meeting";
import LiveTest from "../models/liveTest";

const getDashboardCount = async (req: Request, res: Response) => {
  try {
    const language = await Language.countDocuments();
    const level = await Level.countDocuments();
    const lesson = await Lesson.countDocuments();
    const test = await Test.countDocuments();
    const module = await Module.countDocuments();
    const question = await Question.countDocuments();
    const video = await Video.countDocuments();
    const plan = await Plan.countDocuments();
    const user = await User.countDocuments();
    const role = await Role.countDocuments();
    const order = await Order.countDocuments();
    const meeting = await Meeting.countDocuments();
    const liveTest = await LiveTest.countDocuments();

    const arr = {
      LanguageCount: language,
      LevelCount: level,
      LessonCount: lesson,
      TestCount: test,
      ModuleCount: module,
      QuestionCount: question,
      VideoCount: video,
      PlanCount: plan,
      UserCount: user,
      RoleCount: role,
      OrderCount: order,
      MeetingCount: meeting,
      LiveTestCount: liveTest,
    };

    res.status(200).json(arr);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error.." });
  }
};

export { getDashboardCount };
