import {
  addTeacher,
  getTeachersByUser,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
} from '../services/teacher.sevices.js';
import { errorHandler } from '../utils/error.js';

export const addTeacherController = (req, res, next) => {
  const data = {
    name: req.body.name,
    subject: req.body.subject,
    appointed_date: req.body.appointed_date,
    phone: req.body.phone,
    user_id: req.user.id,
  };

  // eslint-disable-next-line no-unused-vars
  addTeacher(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Teacher added!');
  });
};

export const getTeachersController = (req, res, next) => {
  if (parseInt(req.params.id) !== req.user.id) {
    return next(errorHandler(401, 'Unauthorized!'));
  }

  getTeachersByUser(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json(results);
  });
};

export const getTeacherController = (req, res, next) => {
  getTeacherById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json(results[0]);
  });
};

export const updateTeacherController = (req, res, next) => {
  const data = {
    name: req.body.name,
    subject: req.body.subject,
    appointed_date: req.body.appointed_date,
    phone: req.body.phone,
    address: req.body.address,
    birth_date: req.body.birth_date,
    proPic: req.body.proPic,
    id: req.params.id,
  };

  getTeacherById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'Teacher not found!'));
    }
    // eslint-disable-next-line no-unused-vars
    if (results[0].user_id !== req.user.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }

    // eslint-disable-next-line no-unused-vars
    updateTeacher(data, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json('Teacher updated!');
    });
  });
};

export const deleteTeacherController = (req, res, next) => {
  getTeacherById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'Teacher not found!'));
    }
    // eslint-disable-next-line no-unused-vars
    if (results[0].user_id !== req.user.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }

    // eslint-disable-next-line no-unused-vars
    deleteTeacher(req.params.id, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json('Deleted!');
    });
  });
};
