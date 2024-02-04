import express from 'express';
import { addTeacherController } from '../controllers/teacher.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addTeacherController);

export default router;
