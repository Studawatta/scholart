import { addTeacher, getTeachersByUser } from '../services/teacher.sevices.js';
import { errorHandler } from '../utils/error.js';

export const addTeacherController = (req, res, next) => {
  const data = {
    name: req.body.name,
    subject: req.body.subject,
    appointed_date: req.body.appointed_date,
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
