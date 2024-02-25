import {
  addClass,
  getClassesByUser,
  getClassById,
  updateClass,
  deleteClass,
} from '../services/class.services.js';
import { errorHandler } from '../utils/error.js';

export const addClassController = (req, res, next) => {
  const data = {
    name: req.body.name,
    incharge_teacher: req.body.inchargeTeacherId,
    user_id: req.user.id,
  };

  // eslint-disable-next-line no-unused-vars
  addClass(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Class added!');
  });
};

export const getClassesController = (req, res, next) => {
  if (parseInt(req.params.id) !== req.user.id) {
    return next(errorHandler(401, 'Unauthorized!'));
  }

  getClassesByUser(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};

export const getClassController = (req, res, next) => {
  getClassById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json(results[0]);
  });
};

export const updateClassController = (req, res, next) => {
  const data = {
    name: req.body.name,
    incharge_teacher: req.body.incharge_teacher,
    id: req.params.id,
  };

  console.log(data);

  getClassById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'Class not found!'));
    }
    // eslint-disable-next-line no-unused-vars
    if (results[0].user_id !== req.user.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }

    // eslint-disable-next-line no-unused-vars
    updateClass(data, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json('Class updated!');
    });
  });
};

export const deleteClassController = (req, res, next) => {
  getClassById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'Class not found!'));
    }

    if (results[0].user_id !== req.user.id) {
      return next(errorHandler(401, 'Unauthorized!'));
    }

    // eslint-disable-next-line no-unused-vars
    deleteClass(req.params.id, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json('Deleted!');
    });
  });
};
