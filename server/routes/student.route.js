import express from 'express';
import {
  addStudentController,
  getStudentsController,
  getStudentController,
  deleteStudentController,
} from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addStudentController);
router.get('/:id', verifyToken, getStudentsController);
router.get('/profile/:id', verifyToken, getStudentController);
router.delete('/:id', verifyToken, deleteStudentController);

export default router;
