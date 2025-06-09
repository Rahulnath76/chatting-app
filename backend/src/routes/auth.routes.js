import express from 'express';
import { register, login, logout, me } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middleware/limiter.middleware.js';
import { auth } from '../middleware/auth.middleare.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', loginLimiter, login); 
router.get('/logout', auth, logout);
router.get('/me', auth, me);

export default router;