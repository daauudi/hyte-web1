import express from 'express';
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(authenticateToken, postEntry);

entryRouter
  .route('/:id')
  .get(authenticateToken, getEntryById)
  .put(authenticateToken, putEntry)
  .delete(authenticateToken, deleteEntry);

export default entryRouter;