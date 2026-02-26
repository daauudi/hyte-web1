// Note: db functions are async and must be called with await from the controller
import promisePool from '../utils/database.js';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id = ?';
    const [rows] = await promisePool.execute(sql, [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const result = await promisePool.execute(sql, params);
    return {entry_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// ✅ UPDATE: only owner can update (entry_id AND user_id)
const updateEntryById = async (entryId, userId, entry) => {
  const {entry_date, mood, weight, sleep_hours, notes} = entry;

  const sql = `UPDATE DiaryEntries
               SET entry_date = ?, mood = ?, weight = ?, sleep_hours = ?, notes = ?
               WHERE entry_id = ? AND user_id = ?`;

  const params = [entry_date, mood, weight, sleep_hours, notes, entryId, userId];

  try {
    const [result] = await promisePool.execute(sql, params);
    return result.affectedRows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// ✅ DELETE: only owner can delete (entry_id AND user_id)
const removeEntryById = async (entryId, userId) => {
  const sql = 'DELETE from DiaryEntries WHERE entry_id = ? AND user_id = ?';
  const [result] = await promisePool.execute(sql, [entryId, userId]);
  return result.affectedRows;
};

export {
  listAllEntries,
  findEntryById,
  addEntry,
  listAllEntriesByUserId,
  updateEntryById,
  removeEntryById,
};