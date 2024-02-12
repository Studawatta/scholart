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
