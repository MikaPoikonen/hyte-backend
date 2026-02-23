import express from 'express';
import {
  getUsersController,
  postLogin,
  postUser,
  getUSerByIdController,
  getMe,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter
  .route('/')
  // GET all users
  .get(getUsersController);
// POST new user
userRouter.post('/', postUser);

//Get user info based on token. Ja lisätään authentication.js tiedostosta tähän tapahtumaan. Authentication eka sitten käyttää next();
userRouter.get('/me', authenticateToken, getMe);

userRouter.get('/:id', getUSerByIdController);
// POST user login
userRouter.post('/login', postLogin);



// TODO: get user by id
// app.get('/api/users/:id');
// TODO: put user by id
// TODO: delete user by id

export default userRouter;
