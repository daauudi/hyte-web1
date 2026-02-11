
// HUOM: mokkidata on poistettu modelista

//import users from '../models/user-model.js';



import {

  getAllUsers,

  getUserById,

  addUser,

  findUserByUsername,

} from '../models/user-model.js';





// TODO: lisää tietokantafunktiot user modeliin //DONE

// ja käytä niitä täällä



// TODO: refaktoroi tietokantafunktiolle

const getUsers =  async (req, response) => {

  const user = await getAllUsers();

  response.json(users);

};



// TODO: getUserById

const getUserByIdcontroller = async (req, res) => {

  const id = req.params.id;

  const user = await getUserByIdcontroller(id);



  if (!user) {

    return res.status(404).json({error: 'user not found'});

  }



  res.json(user);

};



// TODO: putUserById



// TODO: deleteUserById



// Käyttäjän lisäys (rekisteröityminen)

// TODO: refaktoroi tietokantafunktiolle

const postUser = async (req, res) => {

  const {username, password, email} = req.body;



  if (!(username && password && email)) {

    return res.status(400).json({error: 'required fields missing'});

  }



  const insertId = await addUser({username, password, email});



  res.status(201).json({

    message: 'new user added',

    user_id: insertId

  });

};





// Tietokantaversio valmis

const postLogin = async (req, res) => {

  const {username, password} = req.body;



  const user = await findUserByUsername(username);



  if (!user) {

    return res.status(404).json({error: 'user not found'});

  }



  if (user.password !== password) {

    return res.status(403).json({error: 'invalid password'});

  }



  delete user.password;



  res.json({message: 'login ok', user});

};



export {

  getUsers,

  getUserByIdcontroller,

  postUser,

  postLogin,

  };