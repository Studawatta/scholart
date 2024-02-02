import { getUserByEmail, registerUser } from '../services/user.services.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../utils/validateEnv.js';

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

export const signinController = (req, res, next) => {
  const body = req.body;

  getUserByEmail(body.email, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'User not found!'));
    } else {
      const checkPassword = bcrypt.compareSync(
        body.password,
        results[0].password
      );

      if (!checkPassword) {
        return next(errorHandler(401, 'Wrong password or email'));
      }

      // eslint-disable-next-line no-unused-vars
      const { password: pass, ...rest } = results[0];

      const token = jwt.sign({ id: results[0].id }, env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  });
};

export const signOutController = (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
