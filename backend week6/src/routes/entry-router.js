import express from 'express';
import { body, param } from 'express-validator';
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
} from '../controllers/entry-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(
    authenticateToken,

    // --- Validators (POST /api/entries) ---
    body('date')
      .optional()
      .isISO8601()
      .withMessage('date must be a valid ISO8601 date (YYYY-MM-DD)'),

    body('mood')
      .exists({ checkFalsy: true })
      .withMessage('mood is required')
      .isInt({ min: 1, max: 5 })
      .withMessage('mood must be an integer between 1 and 5')
      .toInt(),

    body('sleepHours')
      .optional()
      .isFloat({ min: 0, max: 24 })
      .withMessage('sleepHours must be between 0 and 24')
      .toFloat(),

    body('weight')
      .optional()
      .isFloat({ min: 0, max: 500 })
      .withMessage('weight must be a positive number')
      .toFloat(),

    body('note')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('note must be max 500 characters'),

    validationErrorHandler,
    postEntry
  );

entryRouter
  .route('/:id')
  .get(
    param('id').isInt().withMessage('id must be an integer').toInt(),
    validationErrorHandler,
    getEntryById
  )
  .delete(
    authenticateToken,
    param('id').isInt().withMessage('id must be an integer').toInt(),
    validationErrorHandler,
    deleteEntry
  );

export default entryRouter;