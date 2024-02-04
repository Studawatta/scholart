import { db } from '../connect.js';

export const addTeacher = (data, callBack) => {
  const q =
    'INSERT INTO teachers (`name`,`subject`,`appointed_date`,`user_id`) VALUES (?,?,?,?)';

  const values = [data.name, data.subject, data.appointed_date, data.user_id];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
