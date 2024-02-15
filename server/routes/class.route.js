import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addClassController } from '../controllers/class.controller.js';

const router = express.Router();

router.post('/', verifyToken, addClassController);

export default router;
