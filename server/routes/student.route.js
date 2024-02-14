import express from 'express';
import {
  addStudentController,
  getStudentsController,
  deleteStudentController,
} from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, addStudentController);
router.get('/:id', verifyToken, getStudentsController);
router.delete('/:id', verifyToken, deleteStudentController);

export default router;
