import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { addUser, findUserByUsername, listAllUsers } from '../models/user-model.js';

const getUsers = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

//  (rekisteröityminen)
const postUser = async (req, res) => {
  const newUser = req.body;

  if (!(newUser.username && newUser.password && newUser.email)) {
    return res.status(400).json({ error: 'required fields missing' });
  }

  const hash = await bcrypt.hash(newUser.password, 10);
  newUser.password = hash;

  const newUserId = await addUser(newUser);
  res.status(201).json({ message: 'new user added', user_id: newUserId });
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  
  if (!user) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const payload = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    user_level_id: user.user_level_id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });

  return res.json({ message: 'login ok', user: payload, token });
};

// Get user information stored inside token
const getMe = (req, res) => {
  res.json(req.user);
};

export { getUsers, postUser, postLogin, getMe };