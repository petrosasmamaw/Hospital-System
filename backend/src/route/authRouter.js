import express from 'express';
import {
  register,
  login,
  logout,
  getSession,
  forgotPassword,
} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/session', getSession);
router.post('/forgot-password', forgotPassword);

export default router;
