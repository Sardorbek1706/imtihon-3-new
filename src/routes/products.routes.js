import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

// Create a new product
router.post('/', authMiddleware, roleMiddleware(['admin', 'superadmin']), createProduct);

// Get all products
router.get('/', authMiddleware, getAllProducts);

// Get a product by ID
router.get('/:id', authMiddleware, getProductById);

// Update a product
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), updateProduct);

// Delete a product
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), deleteProduct);

export default router;