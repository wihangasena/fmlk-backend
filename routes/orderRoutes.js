const express = require('express');
const router = express.Router();
const {
  createOrder,
  createGuestOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// Guest order route (no auth required)
router.post('/guest', createGuestOrder);

// Get all orders (admin only)
router.route('/').post(protect, createOrder).get(protect, authorize('admin'), getAllOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

module.exports = router;
