import { Router } from 'express';
import authRoutes from './auth.routes';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';
import tagsRoutes from './tags.routes';
import discountsRoutes from './discounts.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/tags', tagsRoutes);
router.use('/discounts', discountsRoutes);

export default router;