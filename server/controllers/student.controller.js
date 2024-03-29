import {
  addStudent,
  getStudentsByUser,
  getStudentById,
  getStudentsByClass,
  updateStudent,
  deleteStudent,
} from '../services/student.services.js';
import { errorHandler } from '../utils/error.js';

export const addStudentController = (req, res, next) => {
  const data = {
    name: req.body.name,
    class: req.body.class,
    birth_date: req.body.birth_date,
    phone: req.body.phone,
    user_id: req.user.id,
  };
  // eslint-disable-next-line no-unused-vars
  addStudent(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Student added!');
  });
};

export const getStudentsController = (req, res, next) => {
  if (parseInt(req.params.id) !== req.user.id) {
    return next(errorHandler(401, 'Unauthorized!'));
  }
  getStudentsByUser(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};

export const getStudentController = (req, res, next) => {
  getStudentById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json(results[0]);
  });
};

export const getStudentsByClassController = (req, res, next) => {
  getStudentsByClass(req.params.classId, (error, results) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json(results);
  });
};

export const updateStudentController = (req, res, next) => {
  const data = {
    name: req.body.name,
    class: req.body.class,
    birth_date: req.body.birth_date,
    phone: req.body.phone,
    proPic: req.body.proPic,
    address: req.body.address,
    id: req.params.id,
  };

  getStudentById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'Student not found!'));
    }
    // eslint-disable-next-line no-unused-vars
    if (results[0].user_id !== req.user.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }

    // eslint-disable-next-line no-unused-vars
    updateStudent(data, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json('Student updated!');
    });
  });
};

export const deleteStudentController = (req, res, next) => {
  getStudentById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'Student not found!'));
    }

    if (results[0].user_id !== req.user.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }

    // eslint-disable-next-line no-unused-vars
    deleteStudent(req.params.id, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json('Deleted!');
    });
  });
};
