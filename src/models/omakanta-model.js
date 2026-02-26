import promisePool from "../utils/database1.js";

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


const addHealthyStats = async (entry) => 
{
    const {user_id,calories_eaten,calories_used,steps,weight_today} = entry
    const sql = `INSERT INTO dailyhealthstats (user_id,calories_eaten,calories_used,steps,weight_today)
                VALUES(?,?,?,?,?)`;
    const params = [user_id,calories_eaten,calories_used,steps,weight_today]
    try {
    const rows = await promisePool.execute(sql, params);
    //console.log('rows', rows);
    return {entry_id: rows[0].insertId}; //ollaan kiinnostuneita mikä on uusimman entrt_id numero. Eli juoksevan päiväkirjamerkinnän id
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
    




 export {listAllHealthyStats,addHealthyStats,listAllHealthyStatsByUser,findUserByUserName};
