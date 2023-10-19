import express from "express";
import User from "../models/user";
import Teacher from "../models/teacherDetails";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import TeacherDetails from "../models/teacherDetails";
import moment from "moment-timezone";

const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await User.find();

    if (user.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Users Not Found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getAllUserByLanguageId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.find({ languageId: id });

    if (user.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `User's of Language ID ${id} is not found`,
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getTeachersList = async (req: Request, res: Response) => {
  try {
    const teacherList = await Teacher.find();
    if (teacherList.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: "Teacher Details Not Found",
      });
      return;
    }

    res.status(200).json(teacherList);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getAllTeacherByLanguageId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // You should use the Mongoose ObjectId to create a valid query
    const ObjectId = require("mongoose").Types.ObjectId;

    // Use the correct Mongoose query to find by languageId and roleId
    const users = await User.find({
      languageId: new ObjectId(id),
      roleId: new ObjectId("65115259a2acb4c71b4d6d76"), // Replace with the correct roleId
    });

    if (users.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Teacher of language Id ${id} is not found`,
      });
      return;
    }

    const teacherPromises = users.map(async (user) => {
      const teacher = await TeacherDetails.find({ userId: user._id });
      return {
        teacher,
      };
    });

    const teachers = await Promise.all(teacherPromises);

    res.status(200).json(teachers);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const editProfileData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res
        .status(404)
        .json({
          status: 404,
          error: "404",
          message: `User of ID ${userId} is not found`,
        });
      return;
    }

    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const editUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        dateModified: currentDate,
      },
      { new: true }
    );

    if (!editUser) {
      res
        .status(400)
        .json({ status: 400, error: "400", message: "Failed to update user" });
      return;
    }

    res.status(200).json(editUser);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export {
  getUserDetails,
  getAllUserByLanguageId,
  getTeachersList,
  getAllTeacherByLanguageId,
  editProfileData,
};
