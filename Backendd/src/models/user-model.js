
import promisePool from "../utils/database.js";



//GET api users

const getAllUsers = async () => {

  const [rows] = await promisePool.execute(

    `SELECT user_id, username, email, created_at, user_level

    From Users`

  );

  return rows;

};



//GET userbyid

const getUserById = async (id) => {

   const [rows] = await promisePool.execute(

    `SELECT user_id, username, email, created_at, user_level

     FROM Users

     WHERE user_id = ?`,

    [id]

  );

  return rows[0];

};





//POST adduser

const addUser = async (user) => {

  const { username, password, email } = user;



  const [result] = await promisePool.execute(

    `INSERT INTO Users (username, password, email)

     VALUES (?, ?, ?)`,

    [username, password, email]

  );



  return result.insertId;

};



const findUserByUsername = async (username) => {

  const sql = 'SELECT * FROM Users WHERE username = ?';

  const [rows] = await promisePool.execute(sql, [username]);

  return rows[0];

};







export {getAllUsers, getUserById, addUser, findUserByUsername};





/*

 * Mock data and endpoints for users resource

 */



/* const users = [

  {

    id: 1,

    username: 'johndoe',

    password: 'password1',

    email: 'johndoe@example.com',

  },

  {

    id: 2,

    username: 'janedoe',

    password: 'password2',

    email: 'janedoe@example.com',

  },

  {

    id: 3,

    username: 'bobsmith',

    password: 'password3',

    email: 'bobsmith@example.com',

  },

];





 */