//HUOM MOKKIDATA ON POISTETTU MODELISTA

// TODO ALEMPANA   lisätietoa user-model.js

// importtaus oikeasta nyt poistettu

// Importataan jwt kirjasto, joka on tarpeen tokenien luomiseen ja tarkistamiseen
import jwt from 'jsonwebtoken';

import bcrypt, {hash} from 'bcryptjs'; // tuodaan bcrypt kirjasto, joka on tarpeen salasanojen hashaukseen

//TODO: redaktoroi tietokanta funktiolle
import {
  findUserByUserName,
  getUsers,
  getUserById,
  addUser,
  listAllUsers,
} from '../models/user-model.js'; //TODO: lisää tietokanta funktiot user modeliin
// ja käytä niitä täällä!!!!!!!!!!!!!!!!!!!!

//TODO: redaktoroi tietokanta funktiolle
const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};


const getUsersAll = async () => {
  const users = await listAllUsers();
  return users;
};




const getUSerByIdController = async (req, res) => {
  const entry = await getUserById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const newUser = req.body;

    // Lähetetään hash tietokantaan salasanan sijaan
    const hash = await bcrypt.hash(newUser.password, 10);
   // 10 on suolan määrä, joka vaikuttaa hashauksen turvallisuuteen. Mitä suurempi, sitä turvallisempi mutta myös hitaampi.
    newUser.password = hash;
    const result = await addUser(newUser);

    if (result.user_id) {
      res.status(201).json({message: 'New user added.', ...result});
    } else {
      res.status(500).json(result);
    }}
  //} else {
   // res.sendStatus(400);
 // }
//};

// Käyttäjän lisäys (rekisteröityminen)
//const postUser = (pyynto, vastaus) => {
//const newUser = pyynto.body;
// Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
// itse koodattu erittäin yksinkertainen syötteen validointi
// if (!(newUser.username && newUser.password && newUser.email)) {
// return vastaus.status(400).json({error: 'required fields missing'});
// }

// HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
//console.log('registering new user', newUser);
//const newId = users[users.length - 1].id + 1;
// luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
// ominaisuudet ja lisätään users-taulukon loppuun
// users.push({id: newId, ...newUser});
//delete newUser.password;
// console.log('users', users);
//vastaus.status(201).json({message: 'new user added', user_id: newId});
//};

// Tietokantaversio!!!!!!!!!!!!!! Tästä esimerkki TODO listalle::::

const postLogin = async (req, res) => {
  const {username, password} = req.body;

  const user = await findUserByUserName(username);
  console.log(user);

  // haetaan käyttäjä-objekti käyttäjän nimen perusteella

  if (user) {
    // Jos asiakkaalta tullut salasana vastaa tietokannasta haettua salasana tiivistettä ehto on TRUE:
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      // TÄssä kohtaa luodaan JWT token käyttämällä sercret fron .env file
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }); // tehdään muuttuja, jwt käyttöön. Haetaan user, procress ja metodi. Aika kauanko voimassa
      return res.json({message: 'login ok', user, token});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

// GET user information based on token
const getMe = (req, res) => {
  res.json(req.user); //lisätään objekti authentication tiedostosta.
};

export {getUsersController, postUser, postLogin, getUSerByIdController, getMe,getUsersAll};
