import express from 'express';
import { getAllProducts, createProduct } from '../controllers/productController';

const router = express.Router();

// Sample route to get all products
router.get('/', getAllProducts);
router.post('/', createProduct);

export default router;