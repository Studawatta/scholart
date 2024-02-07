import express from 'express';
import {
  addTeacherController,
  getTeachersController,
} from '../controllers/teacher.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addTeacherController);
router.get('/:id', verifyToken, getTeachersController);

export default router;
