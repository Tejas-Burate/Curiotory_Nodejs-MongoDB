import express from "express";
import { Request, Response } from "express";
import Test from "../models/test";
import moment from "moment-timezone";

const getTestList = async (req: Request, res: Response) => {
  try {
    const test = await Test.find();
    if (test.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Test Not Found" });
      return;
    }

    res.status(200).json(test);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getTestByTestId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const test = await Test.findOne({ languageId: id });

    if (!test) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test of Test Id ${id} is not found`,
      });
      return;
    }

    res.status(200).json(test);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getTestListByLanguageId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const test = await Test.find({ languageId: id });

    if (test.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test of Language Id ${id} is not found`,
      });
      return;
    }

    res.status(200).json(test);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const updateTestByTestId = async (req: Request, res: Response) => {
  try {
    // const {lessons} = req.body;
    const id = req.params.id;

    const test = await Test.findOne({ _id: id });

    if (!test) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test of Test ID ${id} is not found`,
      });
      return;
    }

    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const testUpdate = await Test.findByIdAndUpdate(
      id,
      {
        ...req.body,
        dateModified: currentDate,
      },
      {
        new: true,
      }
    );

    if (!testUpdate) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to update Test",
      });
      return;
    }

    res.status(200).json(testUpdate);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal Server Error",
    });
  }
};

export {
  getTestList,
  getTestByTestId,
  getTestListByLanguageId,
  updateTestByTestId,
};
