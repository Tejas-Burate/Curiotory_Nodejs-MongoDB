import Video from "../models/video";
import { Request, Response } from "express";
import moment from "moment-timezone";

const getAllVideoList = async (req: Request, res: Response) => {
  try {
    const video = await Video.find();

    if (!video) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Video Not Found" });
      return;
    }

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the lesson.",
    });
  }
};

const getVideoListByLevelId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const video = await Video.find({ levelId: id });

    if (video.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Video of level Id ${id} is not found`,
      });
      return;
    }
    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the lesson.",
    });
  }
};

const createVideo = async (req: Request, res: Response) => {
  try {
    const timezone = process.env.TIMEZONE || "Asia/Kolkata";
    const currentDate = new Date();
    const utcOffset = moment.tz(timezone).utcOffset();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);

    const video = await Video.create({
      ...req.body,
      dateCreated: currentDate,
      dateModified: currentDate,
    });

    if (!video) {
      res
        .status(400)
        .json({ status: 400, error: "400", message: "Failed to create video" });
      return;
    }

    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while updating the lesson.",
    });
  }
};

export { getAllVideoList, getVideoListByLevelId, createVideo };
