import {listAllEntries, findEntryById, addEntry} from "../models/entry-model.js";//lisää omaan


//käyttää modelin listAllEntries();

const getEntries = async (req, res) => {//tämänkin pitää olla asynkroninen //lisää omaan
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id); //hakee id parametreistä modelille //lisää omaan
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};


// addEntryn controlleri
const postEntry = async (req, res) => {
  const { entry_date, mood, weight, sleep_hours, notes} = req.body; //kutsutaan addEnrty ja puretaan bodylla
  const user_id = req.user.user_id; //käyttäjään liittyvä tieto tokenista, joka on purettu authentication middlewareen ja lisätty http objektiin
  
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    //entry date pakollinen.  && väissä valinnaunen && ja user id on pakollinen
    const result = await addEntry(user_id, ...req.body); //odottaa bodyn tulosta 
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result}); // tulostetaan viesti onnistumisesta
    } else {
      res.status(500); //jos tietokanta ongelma
      res.json(result);
    }
  } else {
    res.sendStatus(400); //muissa tapauksissa (asiakkaan tapauksissa)
  }
};

const putEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

const deleteEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};