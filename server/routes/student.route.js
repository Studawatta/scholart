import express from 'express';
import { addStudentController } from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addStudentController);

export default router;
