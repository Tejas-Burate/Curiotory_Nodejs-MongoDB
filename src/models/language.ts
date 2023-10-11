import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  languageName: {
    type: String,
    required: true,
  },
  languageObj: {
    type: Object,
    required: true,
  },
  languageImage: {
    type: String,
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

const Language = mongoose.model("Language", languageSchema);

export default Language;
