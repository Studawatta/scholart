import { db } from '../connect.js';

export const addTeacher = (data, callBack) => {
  const q =
    'INSERT INTO teachers (`name`,`subject`,`appointed_date`,`phone`,`user_id`) VALUES (?,?,?,?,?)';

  const values = [
    data.name,
    data.subject,
    data.appointed_date,
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

export const getTeachersByUser = (userId, callBack) => {
  const q = 'SELECT * FROM teachers WHERE user_id = ?';

  db.query(q, [userId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getTeacherById = (id, callBack) => {
  const q = 'SELECT * FROM teachers WHERE id = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const updateTeacher = (data, callBack) => {
  const q =
    'UPDATE teachers SET `name`=?,`subject`=?,`appointed_date`=?,`phone`=?,`address`=?,`birth_date`=?,`profile_pic`=? WHERE id=?';

  const values = [
    data.name,
    data.subject,
    data.appointed_date,
    data.phone,
    data.address,
    data.birth_date,
    data.proPic,
    data.id,
  ];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const deleteTeacher = (id, callBack) => {
  const q = 'DELETE FROM teachers WHERE `id` =  ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
