import express from 'express';
import {
  addTeacherController,
  getTeachersController,
  deleteTeacherController,
  getTeacherController,
  updateTeacherController,
} from '../controllers/teacher.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addTeacherController);
router.get('/:id', verifyToken, getTeachersController);
router.get('/profile/:id', verifyToken, getTeacherController);
router.put('/update/:id', verifyToken, updateTeacherController);
router.delete('/:id', verifyToken, deleteTeacherController);

export default router;
