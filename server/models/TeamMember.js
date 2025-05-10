const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    facebook: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);
