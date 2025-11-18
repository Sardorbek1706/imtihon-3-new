import { Router } from 'express';
import { signup, signin, getCurrentUser, logout } from '../controllers/auth.controller';
import { validateSignup, validateSignin } from '../middlewares/validators';

const router = Router();

// User signup
router.post('/signup', validateSignup, signup);

// User signin
router.post('/signin', validateSignin, signin);

// Get current user
router.get('/me', getCurrentUser);

// User logout
router.get('/logout', logout);

export default router;