import mongoose from "mongoose";

// Define the Plan Schema
const questionSchema = new mongoose.Schema({
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
  question: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  optionList: {
    type: Object,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },
  isActive: {
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

// Create a Mongoose model based on the schema
const Question = mongoose.model("Question", questionSchema);

export default Question;
