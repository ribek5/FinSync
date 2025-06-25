const express = require("express");
const {
  getReminders,
  addReminder,
  getTodayReminders,
} = require("../controllers/reminderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getReminders);
router.post("/", addReminder);
router.get("/today", getTodayReminders);

module.exports = router;
