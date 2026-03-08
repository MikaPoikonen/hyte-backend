import promisePool from "../utils/database1.js";




// ei käytössä, valmis buildi muuten ja mokkidatan testaamiseen

const listAllHealthyStats = async () => {
    try {
        const result = await promisePool.query('SELECT * FROM dailyhealthstats WHERE user_id = 1');
        const rows = result[0];
        return rows;

    } catch (e) {
        console.log("error", e.message);
        return {error: e.message};
        }
    }

    //Haetaan statsit userid perusteella
const listAllHealthyStatsByUser = async (id) => {
    try {
        const sql = 'SELECT * FROM dailyhealthstats WHERE user_id = ?';
        const result = await promisePool.execute(sql,[id]);
        const rows = result[0];
        return rows;
    } catch(e) {
        console.error('error', e.message);
        return {error: e.message}
    }
}

//  Tietokantaan sql lisäys annetuista tiedoista jotka tulee backendille
const addHealthyStats = async (entry) => 
{
    const {user_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date} = entry
    const sql = `INSERT INTO dailyhealthstats (user_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date)
                VALUES(?,?,?,?,?,?,?,?,?,?)`;
    const params = [user_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date]
    try {
    const rows = await promisePool.execute(sql, params);
    //console.log('rows', rows);
    return {entry_id: rows[0].insertId}; 
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


// Tietokantaan päivitys tieoilla jotka tulevat html puolelta backiin.
const putHealhtyStats = async (entry) => 
{
    const {user_id,stat_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date} = entry
    const sql = `
UPDATE dailyhealthstats 
SET user_id = ?, 
    calories_eaten = ?, 
    calories_used = ?, 
    steps = ?, 
    weight_today = ?, 
    mood = ?, 
    weight = ?, 
    sleep_hours = ?, 
    notes = ?, 
    entry_date = ?
WHERE stat_id = ?`;
    const params = [user_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date,stat_id]
    try {
    const rows = await promisePool.execute(sql, params);
    //console.log('rows', rows);
    return {entry_id: rows[0].insertId}; 
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};






// Get user by id::
const findUserByUserName = async (username) => {
const sql = 'select * FROM users WHERE username = ?';
const [rows] = await promisePool.execute(sql,[username]);
return rows[0]; //palautetaan taulukon eka rivi
};



// merkinnän poisto jos statid ja userid mätsäävät. HTML puolelta poistopyyntö avatusta dialogista
const deleteStat = async (stat_id, user_id) => {
    const sql = 'DELETE FROM dailyhealthstats WHERE stat_id = ? AND user_id = ?';
    const [result] = await promisePool.execute(sql, [stat_id, user_id]);
    return result.affectedRows;
};
    




 export {listAllHealthyStats,addHealthyStats,listAllHealthyStatsByUser,findUserByUserName,putHealhtyStats,deleteStat};
