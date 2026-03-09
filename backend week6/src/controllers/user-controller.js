import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  addUser,
  findUserByUsername,
  listAllUsers,
} from '../models/user-model.js';

// TODO: lisää tietokantafunktiot user modeliin
// ja käytä niitä täällä

// TODO: getUserById
// TODO: putUserById
// TODO: deleteUserById

const getUsers = async (req, response) => {
  const users = await listAllUsers();
  response.json(users);
};

// Käyttäjän lisäys (rekisteröityminen)
const postUser = async (pyynto, vastaus) => {
  const newUser = pyynto.body;

  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);

  // Lasketaan salasanasta tiiviste (hash)
  const hash = await bcrypt.hash(newUser.password, 10);
  //console.log('salasanatiiviste:', hash);
  // Korvataan selväkielinen salasana tiivisteellä ennen kantaan tallennusta
  newUser.password = hash;
  const newUserId = await addUser(newUser);
  vastaus.status(201).json({message: 'new user added', user_id: newUserId});
};

// Tietokantaversio valmis
const postLogin = async (req, res) => {
  try {
    const {username, password} = req.body;
    console.log('1. Kirjautumisyritys käyttäjälle:', username);
    
    // haetaan käyttäjä-objekti käyttäjän nimen perusteella
    console.log('2. Haetaan käyttäjä tietokannasta...');
    const user = await findUserByUsername(username);
    console.log('3. Käyttäjä löytyi?', user ? 'Kyllä' : 'Ei');
    
    if (!user) {
      console.log('4. Käyttäjää ei löydy');
      return res.status(404).json({error: 'user not found'});
    }
    
    console.log('5. Verrataan salasanaa...');
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('6. Salasana oikein?', passwordMatch);
    
    if (!passwordMatch) {
      console.log('7. Väärä salasana');
      return res.status(403).json({error: 'invalid password'});
    }
    
    console.log('8. Salasana oikein, poistetaan salasana objektista');
    delete user.password;
    
    console.log('9. Tarkistetaan JWT-asetukset...');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Asetettu' : 'PUUTTUU');
    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN ? 'Asetettu' : 'PUUTTUU');
    
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new Error('JWT-asetukset puuttuvat .env tiedostosta');
    }
    
    console.log('10. Luodaan token...');
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    console.log('11. Kirjautuminen onnistui!');
    return res.json({message: 'login ok', user, token});
    
  } catch (error) {
    console.error('VIRHE KIRJAUTUMISESSA:');
    console.error('Viesti:', error.message);
    console.error('Nimi:', error.name);
    console.error('Stack:', error.stack);
    return res.status(500).json({error: error.message});
  }
};

// Get user information stored inside token
const getMe = (req, res) => {
  res.json(req.user);
};

export {getUsers, postUser, postLogin, getMe};