import '../css/api.css';

// API:n perusosoite
const API_URL = 'http://localhost:3000/api';

// Apufunktio tokenin hakemiseen
const getToken = () => localStorage.getItem('token');

// Apufunktio auth-headereiden luomiseen
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

// ============================================
// KÄYTTÄJÄT
// ============================================

// Rekisteröinti
export const registerUser = async (username, password, email) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
    });
    return await response.json();
  } catch (error) {
    console.error('Rekisteröinti virhe:', error);
    throw error;
  }
};

// Kirjautuminen
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
    }
    return data;
  } catch (error) {
    console.error('Kirjautuminen virhe:', error);
    throw error;
  }
};

// Haetaan oma käyttäjä
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Käyttäjän haku virhe:', error);
    throw error;
  }
};

// Haetaan kaikki käyttäjät (vain admin)
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Käyttäjien haku virhe:', error);
    throw error;
  }
};

// ============================================
// PÄIVÄKIRJAMERKINNÄT
// ============================================

// Haetaan kaikki merkinnät
export const getAllEntries = async () => {
  try {
    const response = await fetch(`${API_URL}/entries`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Merkintöjen haku virhe:', error);
    throw error;
  }
};

// Haetaan yksi merkintä
export const getEntryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/entries/${id}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Merkinnän haku virhe:', error);
    throw error;
  }
};

// Lisää uusi merkintä
export const addEntry = async (entryData) => {
  try {
    const response = await fetch(`${API_URL}/entries`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(entryData)
    });
    return await response.json();
  } catch (error) {
    console.error('Merkinnän lisäys virhe:', error);
    throw error;
  }
};

// Poista merkintä
export const deleteEntry = async (id) => {
  try {
    const response = await fetch(`${API_URL}/entries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Merkinnän poisto virhe:', error);
    throw error;
  }
};

// ============================================
// ITEMS (harjoituksia varten)
// ============================================

export const getItems = async () => {
  try {
    const response = await fetch(`${API_URL}/items`);
    const data = await response.json();
    console.log('Haetaan omasta rajapinnasta!!!');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Virhe:', error);
  }
};

export const getItemById = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  try {
    const response = await fetch(`${API_URL}/items/${id}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
};

export const deleteItemById = async () => {
  const id = prompt('Anna poistettavan id:');
  if (!id) return;
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
};

export const addItem = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const weight = formData.get('weight');
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, weight })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
};

export const loadItemToPutForm = async () => {
  const id = prompt('Anna muokattavan id:');
  if (!id) return;
  try {
    const response = await fetch(`${API_URL}/items/${id}`);
    const item = await response.json();
    console.log('Ladataan muokkaukseen:', item);
    // Täytetään formi
    document.querySelector('#put-id').value = item.id;
    document.querySelector('#put-name').value = item.name;
    document.querySelector('#put-weight').value = item.weight;
  } catch (error) {
    console.error('Virhe:', error);
  }
};

export const updateItemById = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  const name = formData.get('name');
  const weight = formData.get('weight');
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, weight })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
};

// ============================================
// ALUSTUS
// ============================================

console.log('API scripti starttaa');

// Napin kuuntelijat jos ne on olemassa
document.addEventListener('DOMContentLoaded', () => {
  const getItemsBtn = document.querySelector('.get_items');
  if (getItemsBtn) getItemsBtn.addEventListener('click', getItems);

  const getForm = document.querySelector('.get-item-form');
  if (getForm) getForm.addEventListener('submit', getItemById);

  const deleteBtn = document.querySelector('.delete-item');
  if (deleteBtn) deleteBtn.addEventListener('click', deleteItemById);

  const addItemForm = document.querySelector('.add-item-form');
  if (addItemForm) addItemForm.addEventListener('submit', addItem);

  const loadItemBtn = document.querySelector('.load-item');
  if (loadItemBtn) loadItemBtn.addEventListener('click', loadItemToPutForm);

  const putForm = document.querySelector('.put-item-form');
  if (putForm) putForm.addEventListener('submit', updateItemById);
});