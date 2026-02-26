// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.js'; //importataan yhteys databaseen

const listAllEntries = async () => {
  try {
    
    const result = await promisePool.query('SELECT * FROM DiaryEntries');

    const rows = result[0]; 
    return rows; 
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


// Haetaan kirjautuneen käyttäjäm id. Näkee vain omansa!!!!!!!!!!!!!!!!!
const listAllEntriesByUser = async (id) => {
  try {
    
    const sql = 'SELECT * FROM Diaryentries WHERE user_id = ?'; //käytetään execute kun halutaan ?(muuttuva parametri) tilalle laittaa  [id](listatut arvot) haetaan id:llä //sama promisebool/
    const result = await promisePool.execute(sql,[id]); //käytetään execute kun halutaan ?(muuttuva parametri) tilalle laittaa  [id](listatut arvot) haetaan id:llä //sama promisebool/
    
    const rows = result[0]; 
    return rows; 
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};




const findEntryById = async (id) => {
  try {
    const [result] = await promisePool.execute(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',[id]); //käytetään execute kun halutaan ?(muuttuva parametri) tilalle laittaa  [id](listatut arvot) haetaan id:llä //sama promisebool/

    //tai const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id =' + id); Tässä on haavoittovuus älä käytä "SQL INJEKTIO"
    //console.log('rows', rows);
    return result[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => { //controlleriin entry  objekti
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry; //Pilkotaan muuttujiksi
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes]; //ylempänä minne insert ja arvot on kysymysmerkkejä jotka haetaan //
  
  try {
    const rows = await promisePool.execute(sql, params);
    //console.log('rows', rows);
    return {entry_id: rows[0].insertId}; //ollaan kiinnostuneita mikä on uusimman entrt_id numero. Eli juoksevan päiväkirjamerkinnän id
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const removeEntryById = async (entryId, userId) => {
  const sql = 'DELETE FROM DiaryEntries WHERE entry_id = ? AND user_id = ?';
  const result = await promisePool.execute(sql,[entryId,userId]);
  return result.affectedRows; //palautetaan tieto siitä kuinka monta riviä on vaikuttanut. Eli jos 0, ei onnistunut, jos 1 onnistui
}




export {listAllEntries, findEntryById, addEntry,listAllEntriesByUser,removeEntryById};
