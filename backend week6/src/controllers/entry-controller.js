// src/controllers/entry-controller.js

// Haetaan kaikki merkinnät
export const getEntries = async (req, res) => {
  try {
    const user_id = req.user.user_id; // Tulee tokenista
    // Tähän tietokantakysely
    res.json({ message: 'Get all entries for user', user_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Haetaan yksi merkintä
export const getEntryById = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.user_id;
    // Tähän tietokantakysely
    res.json({ message: `Get entry ${id} for user ${user_id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lisätään uusi merkintä
export const postEntry = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const entryData = req.body;
    // Tähän tietokantakysely
    res.status(201).json({ message: 'Entry created', data: entryData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Poistetaan merkintä
export const deleteEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.user_id;
    // Tähän tietokantakysely
    res.json({ message: `Entry ${id} deleted for user ${user_id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};