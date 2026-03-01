import '../css/styles.css';

import { getItems, getItemById, deleteItemById, addItem } from './items.js';

// Kun DOM on ladattu
document.addEventListener('DOMContentLoaded', () => {

  // Lataa kaikki itemit heti
  getItems();

  // GET by ID
  const getForm = document.querySelector('.get-item-form');
  if (getForm) {
    getForm.addEventListener('submit', getItemById);
  }

  // DELETE by ID
  const deleteForm = document.querySelector('.delete-item-form');
  if (deleteForm) {
    deleteForm.addEventListener('submit', deleteItemById);
  }

  // ADD item
  const addForm = document.querySelector('.add-item-form');
  if (addForm) {
    addForm.addEventListener('submit', addItem);
  }

});