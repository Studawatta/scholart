import { db } from '../connect.js';

export const addClass = (data, callBack) => {
  const q =
    'INSERT INTO classes (`name`,`incharge_teacher`,`user_id`) VALUES (?,?,?)';

  const values = [data.name, data.incharge_teacher, data.user_id];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getClassesByUser = (userId, callBack) => {
  const q = 'SELECT * FROM classes WHERE user_id = ?';

  db.query(q, [userId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getClassById = (id, callBack) => {
  const q = 'SELECT * FROM classes WHERE id = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }

    return callBack(null, results);
  });
};

export const deleteClass = (id, callBack) => {
  const q = 'DELETE FROM classes WHERE `id` = ?';
  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }

    return callBack(null, results);
  });
};
