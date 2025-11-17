const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleGuard = require('../middlewares/roleGuard');
const { body } = require('express-validator');

router.get('/', productController.list);
router.get('/:id', productController.get);

// Protected routes
router.post('/', authMiddleware, [
  body('name').notEmpty(),
  body('price').isNumeric()
], productController.create);

router.put('/:id', authMiddleware, roleGuard('admin'), productController.update);
router.delete('/:id', authMiddleware, roleGuard('admin'), productController.remove);

module.exports = router;
