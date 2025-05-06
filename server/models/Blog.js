const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      minlength: [6, "Minimum title length should be 6 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please add content"],
      minlength: [50, "Content must be at least 50 characters"],
    },
    coverImage: {
      type: String, // URL to cover image
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["uploaded", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Automatically set publishedAt if isPublished becomes true
blogSchema.pre("save", function (next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
