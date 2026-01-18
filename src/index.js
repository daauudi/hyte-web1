import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy mock data (nollautuu aina, kun sovelluksen käynnistää uudelleen)
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Banaaneja'},
];

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// API root
app.get('/', (req, res) => {
  res.send('This is dummy items API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// Get item based on id
app.get('/items/:id', (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.status(200).json(itemFound);
  } else {
    res.status(404).json({message: 'item not found'});
  }
});

// TODO: add PUT route for items
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const {name} = req.body;

  // virhe: body puuttuu / väärä muoto
  if (!name || typeof name !== 'string') {
    return res.status(400).json({message: 'name is required (string)'});
  }

  const itemFound = items.find(item => item.id === id);

  // test error response too
  if (!itemFound) {
    return res.status(404).json({message: 'item not found'});
  }

  itemFound.name = name;
  return res.status(200).json({message: 'item updated', item: itemFound});
});

// TODO: add DELETE route for items
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(item => item.id === id);

  // test error response too
  if (index === -1) {
    return res.status(404).json({message: 'item not found'});
  }

  const deleted = items.splice(index, 1)[0];
  return res.status(200).json({message: 'item deleted', item: deleted});
});

// Add new item
app.post('/items', (req, res) => {
  // TODO: lisää id listaan lisättävälle objektille
  const {name} = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({message: 'name is required (string)'});
  }

  // seuraava id
  const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = {id: nextId, name};
  items.push(newItem);

  return res.status(201).json({message: 'new item added', item: newItem});
});

// 404 response for non-existing resources
app.use((req, res) => {
  res.status(404).json({message: 'route not found'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
