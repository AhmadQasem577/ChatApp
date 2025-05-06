import express from 'express';
import {signup,login,logout, updateProfile, checkAuth} from '../controllers/auth.controller.js';
import {protectRoute, checkLogin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup',checkLogin, signup);

router.post('/login', checkLogin,login); 

router.post('/logout', logout);

router.put('/profile/edit',protectRoute, updateProfile);

 router.get('/auth-check',protectRoute, checkAuth);

export default router;