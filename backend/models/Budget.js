const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  month: { type: String, required: true }, // e.g., '2025-06'
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Budget', budgetSchema);
