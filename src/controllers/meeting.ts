import Meeting from "../models/meeting";
import { Request, Response } from "express";
import User from "../models/user";
import Language from "../models/language";

const getAllJitsiMeeting = async (req: Request, res: Response) => {
  try {
    // Use the populate method to fetch related data from the Language collection
    const meetings = await Meeting.find().populate(
      "languageId",
      "languageName"
    );

    res.status(200).json(meetings);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const deleteMeetingByMeetingId = async (req: Request, res: Response) => {
  try {
    const { meetingId } = req.body;
    const meeting = await Meeting.findOne({ _id: meetingId });

    if (!meeting) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Meeting of meeting ID ${meetingId} is not found`,
      });
      return;
    }

    const deleteMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!deleteMeeting) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to delete meeting",
      });
      return;
    }

    res.status(200).json({
      message: `Meeting of ID ${meetingId} is deleted successfully...`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export { getAllJitsiMeeting, deleteMeetingByMeetingId };
