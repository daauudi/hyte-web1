import express from 'express';
import {
  deleteItemById,
  getItemById,
  getItems,
  postNewItem,
  putItemById
} from './items.js';

import {
  getUsers,
  getUserById,
  putUserById,
  deleteUserById,
  postLogin
} from './users.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Endpoints 
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.put('/api/items/:id', putItemById);
app.delete('/api/items/:id', deleteItemById);
app.post('/api/items', postNewItem);

// Users resource endpoints 
app.get('/api/users', getUsers);
app.post('/api/users/login', postLogin);
app.get('/api/users/:id', getUserById);
app.put('/api/users/:id', putUserById);
app.delete('/api/users/:id', deleteUserById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
