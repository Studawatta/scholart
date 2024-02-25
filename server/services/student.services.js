import { db } from '../connect.js';

export const addStudent = (data, callBack) => {
  const q =
    'INSERT INTO students (`name`,`class`, `birth_date`,`phone`,`user_id`) VALUES (?,?,?,?,?)';

  const values = [
    data.name,
    data.class,
    data.birth_date,
    data.phone,
    data.user_id,
  ];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getStudentsByUser = (userId, callBack) => {
  const q = 'SELECT * FROM students_view WHERE user_id = ?';

  db.query(q, [userId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getStudentById = (id, callBack) => {
  const q = 'SELECT * FROM students_view WHERE student_id = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getStudentsByClass = (id, callBack) => {
  const q = 'SELECT name FROM students WHERE class = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const updateStudent = (data, callBack) => {
  const q =
    'UPDATE students SET `name`=?,`class`=?,`birth_date`=?,`phone`=?,`profile_pic`=?,`address`=? WHERE id=?';

  const values = [
    data.name,
    data.class,
    data.birth_date,
    data.phone,
    data.proPic,
    data.address,
    data.id,
  ];

  db.query(q, values, (error, results) => {
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
