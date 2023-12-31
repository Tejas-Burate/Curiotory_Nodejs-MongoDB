import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  languageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
    required: false,
  },
  levelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: false,
  },
  lesson: {
    type: Array,
    ref: "Lesson",
    required: false,
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
  dateCreated: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);
export default Test;
