import { fetchData } from './fetch.js';

const API_URL = 'http://localhost:3000/api';

const showSnackbar = (text) => {
  const sb = document.querySelector('#snackbar');
  if (!sb) {
    console.log(text);
    return;
  }
  sb.textContent = text;
  sb.className = 'show';
  setTimeout(() => (sb.className = sb.className.replace('show', '')), 3000);
};

const getMessage = (res, fallback) => {
  if (!res) return fallback;
  if (res.message) return res.message;
  if (res.error) return res.error;
  return fallback;
};

// POST /users (Add User form)
const addUser = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username')?.value?.trim();
  const password = document.querySelector('#password')?.value?.trim();
  const email = document.querySelector('#email')?.value?.trim();

  if (!username || !password || !email) {
    showSnackbar('Täytä username, password ja email');
    return;
  }

  const created = await fetchData(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });

  if (created?.error) {
    showSnackbar(getMessage(created, 'Käyttäjän lisäys epäonnistui'));
    return;
  }

  console.log(created);
  showSnackbar(getMessage(created, `Lisätty käyttäjä: ${username}`));
  event.target.reset();
};

// (valinnainen) jos teet myöhemmin users-listan:
const getUsersAndRender = async () => {
  const users = await fetchData(`${API_URL}/users`);
  console.log(users);
};

export { addUser, getUsersAndRender };