import { addStudent } from '../services/student.services.js';
export const addStudentController = (req, res, next) => {
  const data = {
    name: req.body.name,
    class: req.body.class,
    age: req.body.age,
    gender: req.body.gender,
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
