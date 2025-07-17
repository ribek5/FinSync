const mongoose = require("mongoose");
// const User = require("./models/user");
const Reminder = require("./models/reminder");
const { sendReminderEmail } = require("./emailService");

const runDailyReminderJob = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const reminders = await Reminder.find({
    date: { $gte: today, $lt: tomorrow },
  }).populate("userId");

  const userRemindersMap = {};

  reminders.forEach((reminder) => {
    const email = reminder.userId.email;
    if (!userRemindersMap[email]) userRemindersMap[email] = [];
    userRemindersMap[email].push(reminder);
  });

  for (const [email, userReminders] of Object.entries(userRemindersMap)) {
    await sendReminderEmail(email, userReminders);
  }
};

runDailyReminderJob();
