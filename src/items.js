
import { fetchData } from "./fetch.js";



const apiurl = 'http://localhost:3000/api';



const renderFruitList = (items) => {

  console.log('Teen kohta listan');



  const fruitlist = document.querySelector('.fruitlist');

  fruitlist.innerHTML = '';



  console.log(items);

  items.forEach((item) => {

    console.log(item.name);

    let li = document.createElement('li');

    li.textContent = `Hedelmän id ${item.id} ja nimi ${item.name} `;

    fruitlist.appendChild(li);

  });

};

// GET items

const getItems = async () => {

  const items = await fetchData('http://localhost:3000/api/items');



  // jos BE puolelta tulee virhe niin informoidaan

  // joko consoleen tai käyttäjälle virheestä



  if (items.error) {

    console.log(items.error);

    return;

  }



  // tai jatketaan jä tehdään datalle jotain

  // items.forEach((item) => {

  //   console.log(item.name);

  // });



  renderFruitList(items);

};



// GET itemsbyid

////////////////



const getItemById = async (event) => {

  console.log('Haetaan id:llä');



  event.preventDefault();



  const idInput = document.querySelector('#itemId');

const itemId = idInput.value;

console.log(itemId);



  const url =(`http://localhost:3000/api/items/${itemId}`);



  const options = {

    method: 'GET',

  };

  const items = await fetchData(url,options);



  // jos BE puolelta tulee virhe niin informoidaan

  // joko consoleen tai käyttäjälle virheestä



  if (items.error) {

    console.log(items.error);

    return;

  }

  //1.developer tool

  console.log(items);

//2.Käyttäjälle alert

  alert(`Item found: ${items.name} ID: ${items.id}`);

};



//DELETE item



const deleteItemById = async (event) => {

  console.log('Poistetaan id:llä');



  event.preventDefault();



  const idInput = document.querySelector('#itemId');

const itemId = idInput.value;

console.log(itemId);



//MUista tarkistaa että käyttäjä lähettää oikean datan

if(!itemId) {console.log('ID puuttuu täytäthän tiedot');

  return;}



const confirmed = confirm(`Haluatko varmasti poistaa itemin ID: ${itemId}?`

);

if (!confirmed) {

  return;

}



const url =(`http://localhost:3000/api/items/${itemId}`);



  const options = {

    method: 'delete',

  };

  const items = await fetchData(url,options);



  // jos BE puolelta tulee virhe niin informoidaan

  // joko consoleen tai käyttäjälle virheestä



  if (items.error) {

    console.log(items.error);

    return;

  }

  //1.developer tool

  console.log(items);

//2.Käyttäjälle alert

  alert(`Item deleted: ${items.name} ID: ${items.id}`);





//3.Päivitetään UI niin että käyttäjä tietoää että hedelmä poistui listasta

await getItems();



};



//POST item



const addItem = async (event) => {

  console.log('Lisätään uusi item');



  event.preventDefault();



  const form = document.querySelector('.add-item-form');

  const fruitName = document.querySelector('#newItemName').value.trim();

  const fruitWeight = document.querySelector('#newItemWeight').value.trim();



if (!fruitName) {

  alert('Nimi puuttuu täytäthän tiedot');

  return;

}



const body = {

  name: fruitName,

  weight: fruitWeight

};



  const url =(`http://localhost:3000/api/items/`);



  const options = {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json',

    },

    body: JSON.stringify(

      {

        name:fruitName,

        weight: fruitWeight,

      }

    )

  };



  const response = await fetchData(url,options);



  // jos BE puolelta tulee virhe niin informoidaan

  // joko consoleen tai käyttäjälle virheestä



  if (response.error) {

    console.log(response.error);

    return;

  }

  //1.developer tool

  console.log(response);

//2.Käyttäjälle alert

  alert(`Item added: ${fruitName}`);

};



export { getItems,getItemById, deleteItemById,addItem };















