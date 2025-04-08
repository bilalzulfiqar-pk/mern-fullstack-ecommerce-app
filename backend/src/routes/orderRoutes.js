const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Route to place an order
router.post('/place-order', authMiddleware, placeOrder);

module.exports = router;
