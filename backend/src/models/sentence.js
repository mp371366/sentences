import mongoose from "mongoose";

const sentenceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: Array
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  dislakes: {
    type: Number,
    required: true,
    default: 0
  },
  viewed: {
    type: Number,
    required: true,
    default: 0
  },
  added: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Sentence', sentenceSchema);