import { addClass } from '../services/class.services.js';

export const addClassController = (req, res, next) => {
  const data = {
    name: req.body.name,
    incharge_teacher: req.body.incharge_teacher,
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
