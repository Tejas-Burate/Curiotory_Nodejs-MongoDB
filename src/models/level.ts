import mongoose from "mongoose";
import moment from "moment-timezone";

const levelSchema = new mongoose.Schema({
  levelName: {
    type: String,
    required: true,
  },
  languageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
    required: false,
  },
  dateCreated: {
    type: Date,
  },
  dateModified: {
    type: Date,
  },
});

const Level = mongoose.model("Level", levelSchema);

export default Level;
