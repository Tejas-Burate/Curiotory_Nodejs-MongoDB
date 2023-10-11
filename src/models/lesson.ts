import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
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
  lessonName: {
    type: String,
    required: true,
  },
  lessonDescription: {
    type: String,
    required: true,
  },
  lessonImage: {
    type: String,
    required: true,
  },
  status: {
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

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
