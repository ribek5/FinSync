const Reminder = require("../models/Reminder");

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).sort({
      date: 1,
    });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

exports.addReminder = async (req, res) => {
  try {
    const { title, date } = req.body;
    const reminder = await Reminder.create({
      userId: req.user.id,
      title,
      date,
    });
    res.status(201).json(reminder);
  } catch (err) {
    res.status(400).json({ error: "Failed to add reminder" });
  }
};

exports.getTodayReminders = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const reminders = await Reminder.find({
      userId: req.user.id,
      date: { $gte: today, $lt: tomorrow },
    }).sort({ date: 1 });

    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today’s reminders" });
  }
};
