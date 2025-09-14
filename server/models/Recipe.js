const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    image: { type: String },
    category: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likeCount: { type: Number, default: 0 },
    saveCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", recipeSchema);
