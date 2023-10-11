import mongoose from "mongoose";

const liveTestSchema = new mongoose.Schema({
  languageId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Language",
    required: true,
  },
  levelId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Level",
    required: true,
  },
  lesson: {
    type: Object,
    required: true,
  },
  testImage: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  rightAns: {
    type: Number,
    required: true,
  },
  wrongAns: {
    type: Number,
    required: true,
  },
  totalQues: {
    type: Number,
    required: true,
  },
  questions: {
    type: Object,
    default: null, // You can set the default value to null or adjust as needed
  },
  time: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
});

const LiveTest = mongoose.model("LiveTest", liveTestSchema);

export default LiveTest;
