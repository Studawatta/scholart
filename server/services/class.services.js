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
