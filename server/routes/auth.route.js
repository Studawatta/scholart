import express from 'express';
import {
  signupController,
  signinController,
  signOutController,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/signin', signinController);
router.post('/signout', signOutController);

export default router;
