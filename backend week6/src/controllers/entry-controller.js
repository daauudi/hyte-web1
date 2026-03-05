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

    // entry_date is required
    body('entry_date')
      .exists({ checkFalsy: true })
      .withMessage('entry_date is required')
      .isISO8601()
      .withMessage('entry_date must be a valid date (YYYY-MM-DD)')
      .toDate(),

    // at least one of these must exist: mood OR weight OR sleep_hours OR notes
    body().custom((value, { req }) => {
      const { mood, weight, sleep_hours, notes } = req.body;
      const hasAny =
        mood !== undefined ||
        weight !== undefined ||
        sleep_hours !== undefined ||
        (notes !== undefined && String(notes).trim() !== '');
      if (!hasAny) {
        throw new Error(
          'At least one of mood, weight, sleep_hours or notes must be provided'
        );
      }
      return true;
    }),

    // mood optional: integer 1..5 (change range if your assignment says otherwise)
    body('mood')
      .optional({ nullable: true })
      .isInt({ min: 1, max: 5 })
      .withMessage('mood must be an integer between 1 and 5')
      .toInt(),

    // weight optional: positive number
    body('weight')
      .optional({ nullable: true })
      .isFloat({ min: 0, max: 500 })
      .withMessage('weight must be a number (0-500)')
      .toFloat(),

    // sleep_hours optional: 0..24
    body('sleep_hours')
      .optional({ nullable: true })
      .isFloat({ min: 0, max: 24 })
      .withMessage('sleep_hours must be between 0 and 24')
      .toFloat(),

    // notes optional: max length
    body('notes')
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 500 })
      .withMessage('notes must be max 500 characters'),

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