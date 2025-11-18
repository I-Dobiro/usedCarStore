import express from 'express';
import { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/ordersController';


const router = express.Router();

// Order Routes
router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;