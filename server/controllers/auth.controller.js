import { getUserByEmail, registerUser } from '../services/user.services.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';

export const signupController = (req, res, next) => {
  const body = req.body;
  //CHECK IF EMAIL EXISTS
  getUserByEmail(body.email, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length) {
      return next(errorHandler(409, 'Email already exists!'));
    } else {
      //CREATE A NEW USER

      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);

      // eslint-disable-next-line no-unused-vars
      registerUser(body, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).json('User created successfully!');
      });
    }
  });
};
