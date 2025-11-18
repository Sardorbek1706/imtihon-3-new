import { Router } from 'express';
import { createDiscount, getAllDiscounts, getDiscountById, updateDiscount, deleteDiscount } from '../controllers/discounts.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, authorize('admin'), createDiscount);
router.get('/', authenticate, getAllDiscounts);
router.get('/:id', authenticate, getDiscountById);
router.put('/:id', authenticate, authorize('admin'), updateDiscount);
router.delete('/:id', authenticate, authorize('admin'), deleteDiscount);

export default router;