import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
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
  videoName: {
    type: String,
    required: true,
  },
  videoThumbnail: {
    type: String,
    required: true,
  },
  videoFileName: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: false,
  },
  dateModified: {
    type: Date,
    required: false,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
