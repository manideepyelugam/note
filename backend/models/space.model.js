const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chats: [
        {
            message: { type: String, required: true },
            sender: { type: String, enum: ["user", "ai"], required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

module.exports = mongoose.model("Space", spaceSchema);
