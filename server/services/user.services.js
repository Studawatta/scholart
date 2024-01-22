import { db } from '../connect.js';

export const registerUser = (data, callBack) => {
  const q =
    'INSERT INTO users (`username`,`school_name`,`email`,`password`) VALUES (?,?,?,?)';
  const values = [data.username, data.school_name, data.email, data.password];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getUserByEmail = (email, callBack) => {
  const q = 'SELECT * FROM users WHERE email = ?';

  db.query(q, [email], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
