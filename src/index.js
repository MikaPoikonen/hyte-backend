import express from 'express';
import cors from 'cors';
import omakantaRouter from './routes/omakanta-router.js';
import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
import requestLogger from './middlewares/logger.js';
import entryRouter from './routes/entry-router.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// enable CORS requests
app.use(cors());

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());
// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));
// Oma loggeri middleware, käytössä koko sovelluksen laajuisesti eli käsittee kaikki http-pyynnöt
app.use(requestLogger);

app.use('/api/omakanta', omakantaRouter);







// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

//users recoursce router for all users
app.use('/api/users', userRouter);

//diary entries recource router
app.use('/api/entries',entryRouter);



// Dummy items resource
app.use('/api/items', itemRouter);

// jos pyyntö ei mätsää minkään ylläolevan reitin kanssa, kyseessä on 404-tilanne
app.use(notFoundHandler);
// virheenkäsittelijälle ohjataan kaikki pyynnöt jossa mukana error objekti
app.use(errorHandler);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
