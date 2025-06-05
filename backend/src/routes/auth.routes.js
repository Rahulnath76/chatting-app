import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middleware/limiter.middleware.js';
import { auth } from '../middleware/auth.middleare.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', loginLimiter, login); 
router.get('/logout', auth, logout);

export default router;