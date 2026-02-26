import {
  findEntryById,
  addEntry,
  listAllEntriesByUserId,
  removeEntryById,
  updateEntryById,
} from '../models/entry-model.js';

const getEntries = async (req, res) => {
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

// ✅ only owner can view entry by id
const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);

  if (!entry) {
    return res.sendStatus(404);
  }

  if (entry.user_id !== req.user.user_id) {
    return res.status(403).json({message: 'not allowed'});
  }

  res.json(entry);
};

const postEntry = async (req, res) => {
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;

  // user_id is taken from token (NOT from client)
  const user_id = req.user.user_id;

  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry({user_id, ...req.body});
    if (result.entry_id) {
      return res.status(201).json({message: 'New entry added.', ...result});
    }
    return res.status(500).json(result);
  }

  res.sendStatus(400);
};

// ✅ only owner can update
const putEntry = async (req, res) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;

  const {entry_date, mood, weight, sleep_hours, notes} = req.body;

  if (!entry_date || !(weight || mood || sleep_hours || notes)) {
    return res.sendStatus(400);
  }

  const result = await updateEntryById(entryId, userId, {
    entry_date,
    mood,
    weight,
    sleep_hours,
    notes,
  });

  if (result?.error) {
    return res.status(500).json(result);
  }

  if (result === 0) {
    return res.status(403).json({message: 'not allowed or entry not found'});
  }

  res.json({message: 'entry updated'});
};

// ✅ only owner can delete (already enforced in model)
const deleteEntry = async (req, res) => {
  const affectedRows = await removeEntryById(req.params.id, req.user.user_id);

  if (affectedRows > 0) {
    return res.json({message: 'entry deleted'});
  }

  // could be "not found" or "not owner"
  res.status(403).json({message: 'not allowed or entry not found'});
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};