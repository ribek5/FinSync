const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendReminderEmail = async (email, reminders) => {
  const message = reminders
    .map((r) => `• ${r.title} `)
    .join("\n");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Today's Reminders - FinSync",
    text: `Hi! Here are your reminders for today:\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email}`);
  } catch (err) {
    console.error(`Failed to send email to ${email}: `, err.message);
  }
};
