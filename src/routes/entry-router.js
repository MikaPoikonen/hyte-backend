import express from 'express'; //lisää omaan
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
} from '../controllers/entry-controller.js'; //lisää omaan
import {authenticateToken} from '../middlewares/authentication.js'; //lisää omaan
import {body} from 'express-validator';

const entryRouter = express.Router(); //lisää omaan

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(authenticateToken,body(), postEntry); //lisää omaan. Tässä on haku sekä post entry. body() validoi

entryRouter
  .route('/:id')
  .get(authenticateToken, getEntryById)
  .delete(authenticateToken, deleteEntry); //selaimesta löytyy  3000/api/entries/1  "siis id 1" //lisää omaan
// Lisättiin myos authenticateToken, body() validointi!

export default entryRouter; //lisää omaan
