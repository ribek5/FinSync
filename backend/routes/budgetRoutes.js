const express = require('express');
const Budget = require('../models/Budget');
const { getUserBudget, setUserBudget } = require('../controllers/budgetController');
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.use(protect)

// Get monthly budget info
router.get('/:month', getUserBudget);

// Set/update monthly budget
router.post('/', setUserBudget);

module.exports = router;
