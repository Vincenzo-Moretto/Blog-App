const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0, // Numero di "mi piace" inizialmente a 0
    },
    likedBy: {
      type: [String], // Array di userId che hanno messo "mi piace"
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
