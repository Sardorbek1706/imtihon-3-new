import { Router } from 'express';
import { 
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categories.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

// Create a new category
router.post('/', authMiddleware, roleMiddleware(['admin', 'superadmin']), createCategory);

// Get all categories
router.get('/', authMiddleware, getAllCategories);

// Get a category by ID
router.get('/:id', authMiddleware, getCategoryById);

// Update a category
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), updateCategory);

// Delete a category
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), deleteCategory);

export default router;