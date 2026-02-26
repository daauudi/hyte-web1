import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
import entryRouter from './routes/entry-router.js';

import requestLogger from './middlewares/logger.js';
import { authenticateToken } from './middlewares/authentication.js';
import { postLogin, getMe } from './controllers/user-controller.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));
app.use(requestLogger);

// API root
app.get('/api', (req, res) => {
  res.send('Teacher example Health Diary API!');
});

// AUTH routes (assignment)
app.post('/api/auth/login', postLogin);
app.get('/api/auth/me', authenticateToken, getMe);

// Users resource router for all /api/users routes
app.use('/api/users', userRouter);

// Diary entries resource router
app.use('/api/entries', entryRouter);

// Dummy items resource
app.use('/api/items', itemRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});