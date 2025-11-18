import { body, validationResult } from 'express-validator';

export const validateUserSignup = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    body('role').isIn(['user', 'admin', 'superadmin']).withMessage('Invalid role'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('gender').isIn(['male', 'female']).withMessage('Invalid gender'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('address').optional().notEmpty().withMessage('Address cannot be empty'),
    body('hobbies').optional().isArray().withMessage('Hobbies must be an array'),
];

export const validateProductCreation = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Product description is required'),
    body('price').isDecimal().withMessage('Price must be a decimal value'),
    body('category').notEmpty().withMessage('Category is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('status').isIn(['available', 'out of stock', 'discontinued']).withMessage('Invalid status'),
    body('imageUrls').optional().isArray().withMessage('Image URLs must be an array'),
    body('tags').optional().isArray().withMessage('Tags must be an array of UUIDs'),
];

export const validateCategoryCreation = [
    body('name').notEmpty().withMessage('Category name is required'),
    body('parentId').optional().isUUID().withMessage('Invalid parent category ID'),
];

export const validateTagCreation = [
    body('name').notEmpty().withMessage('Tag name is required'),
];

export const validateDiscountCreation = [
    body('productId').isUUID().withMessage('Invalid product ID'),
    body('discountPercent').isInt({ min: 0, max: 100 }).withMessage('Discount percent must be between 0 and 100'),
    body('startDate').isISO8601().withMessage('Invalid start date'),
    body('endDate').isISO8601().withMessage('Invalid end date'),
];

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};