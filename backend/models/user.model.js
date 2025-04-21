const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  spaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Space" }],
  Notebook: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notebook" }]
});

module.exports = mongoose.model("User", userSchema);
