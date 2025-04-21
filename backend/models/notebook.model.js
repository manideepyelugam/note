const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema({
  title: String,
  summary: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Notebook", notebookSchema);
