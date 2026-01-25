/**
 * Mock data and endpoints for users resource
 */

const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

// GET all users
const getUsers = (req, response) => {
  // ÄLÄ IKINÄ lähetä salasanoja HTTP-vastauksessa
  for (let i = 0; i < users.length; i++) {
    delete users[i].password;
    // kaikki emailit sensuroitu esimerkki
    // users[i].email = 'sensored';
  }
  response.json(users);
};

// TODO: getUserById
const getUserById = (req, res) => {
  const userFound = users.find(user => user.id == req.params.id);

  if (userFound) {
    delete userFound.password;
    return res.json(userFound);
  }
  return res.status(404).json({error: 'user not found'});
};

// TODO: putUserById
const putUserById = (req, res) => {
  const userFound = users.find(user => user.id == req.params.id);

  if (userFound) {
    userFound.username = req.body.username;
    userFound.email = req.body.email;
    res.json({message: 'user updated'});
  } else {
    res.status(404).json({error: 'user not found'});
  }
};

// TODO: deleteUserById
const deleteUserById = (req, res) => {
  const index = users.findIndex(user => user.id == req.params.id);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({message: 'user deleted'});
  } else {
    res.status(404).json({error: 'user not found'});
  }
};

// Käyttäjän lisäys 
const postUser = (pyynto, vastaus) => {
  const newUser = pyynto.body;

  if (!newUser.username || !newUser.password || !newUser.email) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }

  console.log('registering new user', newUser);
  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);

  const newId = users[users.length - 1].id + 1;

  users.push({
    id: newId,
    ...newUser,
  });

  vastaus.status(201).json({message: 'new user added', user_id: newId});
};

const postLogin = (req, res) => {
  const {username, password} = req.body;

  // haetaan käyttäjä
  const userFound = users.find(user => username === user.username);

  if (userFound) {
    if (userFound.password === password) {
      delete userFound.password;
      return res.json({message: 'login ok', user: userFound});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {
  getUsers,
  getUserById,
  putUserById,
  deleteUserById,
  postUser,
  postLogin,
};

