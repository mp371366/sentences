import mongoose from "mongoose";

const sentenceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Sentence', sentenceSchema);