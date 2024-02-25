import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  addClassController,
  getClassesController,
  getClassController,
  updateClassController,
  deleteClassController,
} from '../controllers/class.controller.js';

const router = express.Router();

router.post('/', verifyToken, addClassController);
router.get('/:id', verifyToken, getClassesController);
router.get('/profile/:id', verifyToken, getClassController);
router.put('/update/:id', verifyToken, updateClassController);
router.delete('/:id', verifyToken, deleteClassController);

export default router;
