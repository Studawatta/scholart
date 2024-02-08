import express from 'express';
import {
  addTeacherController,
  getTeachersController,
  deleteTeacherController,
} from '../controllers/teacher.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addTeacherController);
router.get('/:id', verifyToken, getTeachersController);
router.delete('/:id', verifyToken, deleteTeacherController);

export default router;
