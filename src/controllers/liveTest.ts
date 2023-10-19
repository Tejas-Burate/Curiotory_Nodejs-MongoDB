import express from "express";
import { Request, Response } from "express";
import LiveTest from "../models/liveTest";

const getLiveTestByTestId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const liveTest = await LiveTest.findById(id);
    if (!liveTest) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `LiveTest of Id ${id} is not found`,
      });
      return;
    }
    res.status(200).json(liveTest);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error." });
  }
};

export { getLiveTestByTestId };
