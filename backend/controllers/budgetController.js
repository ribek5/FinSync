const { default: mongoose } = require("mongoose");
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

exports.getUserBudget = async (req, res) => {
    try {
        const userId = req.user.id;
      const { month } = req.params;
  
      // Parse month (e.g. "2025-06") into date range
      const startOfMonth = new Date(`${month}-01T00:00:00.000Z`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1); // first day of next month
  
      // 1. Fetch budget
      const budgetDoc = await Budget.findOne({ userId, month });
  
      if (!budgetDoc) {
        return res.status(404).json({ error: 'No budget found for this month' });
      }
  
      // 2. Sum expenses for this month
      const totalExpense = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: { $gte: startOfMonth, $lt: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);
  
      const expense = totalExpense[0]?.total || 0;
      const remaining = budgetDoc.amount - expense;
  
      // 3. Respond with combined data
      res.json({
        budget: budgetDoc.amount,
        expense,
        remaining,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.setUserBudget = async (req, res) => {
    const userId = req.user.id;
  const { month, amount } = req.body;
  let budget = await Budget.findOneAndUpdate(
    { userId, month },
    { $set: { amount } },
    { upsert: true, new: true }
  );
  res.json({
    budget
  });
}