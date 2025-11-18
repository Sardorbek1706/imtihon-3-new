import { Router } from 'express';
import { createTag, getAllTags, getTagById, updateTag, deleteTag } from '../controllers/tags.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

// Create a new tag
router.post('/', authMiddleware, roleMiddleware(['admin', 'superadmin']), createTag);

// Get all tags
router.get('/', authMiddleware, getAllTags);

// Get a tag by ID
router.get('/:id', authMiddleware, getTagById);

// Update a tag
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), updateTag);

// Delete a tag
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), deleteTag);

export default router;