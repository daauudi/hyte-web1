import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy mock data (nollautuu aina, kun sovelluksen käynnistää uudelleen)
const items = [
  { id: 1, name: 'Omena' },
  { id: 2, name: 'Appelsiini' },
  { id: 3, name: 'Banaaneja' },
];

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// API root
app.get('/', (req, res) => {
  res.send('This is dummy items API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get item based on id
app.get('/items/:id', (req, res) => {
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({ message: 'item not found' });
  }
});

// PUT: 
app.put('/items/:id', (req, res) => {
  const itemFound = items.find(item => item.id == req.params.id);

  if (itemFound) {
    itemFound.name = req.body.name;
    res.json({ message: 'item updated', item: itemFound });
  } else {
    res.status(404).json({ message: 'item not found' });
  }
});

// DELETE: 
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(item => item.id == req.params.id);

  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: 'item deleted' });
  } else {
    res.status(404).json({ message: 'item not found' });
  }
});

// Add new item
app.post('/items', (req, res) => {
  // lisää id listaan lisättävälle objektille
  const newId = items.length + 1;
  req.body.id = newId;
  items.push(req.body);

  res.status(201).json({ message: 'new item added' });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
