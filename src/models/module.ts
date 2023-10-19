import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
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
  lessonId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Lesson",
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },
  examMode: {
    type: String,
    required: true,
  },
  questionSet: {
    type: Array,
    required: true,
    // default: null, // You can set the default value to null or adjust as needed
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

const Module = mongoose.model("Module", moduleSchema);
export default Module;
