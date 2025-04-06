import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersFromSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/inbox', protectRoute, getUsersFromSidebar);
router.get('/inbox/:id', protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage);



export default router;