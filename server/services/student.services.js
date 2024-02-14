import { db } from '../connect.js';

export const addStudent = (data, callBack) => {
  const q =
    'INSERT INTO students (`name`,`class`, `age`,`gender`,`user_id`) VALUES (?,?,?,?,?)';

  const values = [data.name, data.class, data.age, data.gender, data.user_id];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getStudentsByUser = (userId, callBack) => {
  const q = 'SELECT * FROM students WHERE user_id = ?';

  db.query(q, [userId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getStudentById = (id, callBack) => {
  const q = 'SELECT * FROM students WHERE id = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const deleteStudent = (id, callBack) => {
  const q = 'DELETE FROM students WHERE `id` = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
