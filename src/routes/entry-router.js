import express from 'express'; //lisää omaan
import { getEntries, getEntryById, postEntry } from '../controllers/entry-controller.js';//lisää omaan
import {authenticateToken} from '../middlewares/authentication.js'; //lisää omaan
const entryRouter = express.Router(); //lisää omaan

entryRouter.route('/').get(getEntries).post(authenticateToken,postEntry); //lisää omaan. Tässä on haku sekä post entry

entryRouter.route('/:id').get(authenticateToken, getEntryById); //selaimesta löytyy  3000/api/entries/1  "siis id 1" //lisää omaan
// Lisättiin myos authenticateToken,

export default entryRouter; //lisää omaan