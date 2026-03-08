import express from 'express';
import {
  getUsersController,
  postLogin,
  postUser,
  getUSerByIdController,
  getMe,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter
  .route('/')
  // GET all users
  .get(authenticateToken, getUsersController)

  // post new user ja siihen liittyvät validoinnit
  //HUOM!!! ValidatingErrorHandler pitää olla viimeisenä
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}),
    body('email').trim().isEmail(),
    validationErrorHandler,
    postUser,
  ); //lisää omaan. Tässä on haku sekä post user. body() validoi
//käyttäjän pituuden tarkistus 3-20 merkkiä. Ja trim() poistaa whitespaceä alusta ja lopusta. Lisää omaan!
// Controlleri tekee päätöksen siitä, onko validointi onnistunut vai ei. Ja jos ei, palauttaa 400 Bad Requestin ja validointivirheet. Lisää omaan!
// passwordin pituuden tarkistus 8-100 merkkiä.
// emailin tarkistus, että on oikean muotoinen.

//Get user info based on token. Ja lisätään authentication.js tiedostosta tähän tapahtumaan. Authentication eka sitten käyttää next();
userRouter.get('/me', authenticateToken, getMe);

userRouter.get('/:id', getUSerByIdController);
// POST user login
userRouter.post('/login', postLogin);


export default userRouter;
