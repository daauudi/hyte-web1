import promisePool from '../utils/database.js';

// TODO: lisää modelit ja muokkaa kontrollerit reiteille:
// GET /api/users/:id - get user by id

// GET /api/users - list all users
const listAllUsers = async () => {
  const sql = 'SELECT username, created_at FROM users';  // muutettu
  const [rows] = await promisePool.query(sql);
  return rows;
};

// POST /api/users - add a new user
const addUser = async (user) => {
  const {username, password, email} = user;
  const sql = `INSERT INTO users (username, password, email)  // muutettu
               VALUES (?, ?, ?)`;
  const params = [username, password, email];
  try {
    const result = await promisePool.execute(sql, params);
    //console.log('insert result', result);
    return {user_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';  // muutettu
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};

export {findUserByUsername, addUser, listAllUsers};