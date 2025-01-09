const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    author: { type: String, require: true },
    publishedYear: { type: Number, require: true },
    genre: [
      {
        type: String,
      },
    ],
    language: { type: String, require: true },
    country: { type: String, default: "United State" },
    rating: { type: Number, min: 0, max: 10, default: 0 },
    summary: { type: String },
    coverImageUrl: { type: String },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
