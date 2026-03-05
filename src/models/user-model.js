import promisePool from '../utils/database.js'; //importataan yhteys databaseen

//TODO: lisää modelit reiteille muokkaa kontrollerit reiteille:
// GET /api/users - list all users
//GET /api/uders/:id - get users by id
// POST /api/users - add new user


const getUsers = async () => {
  const sql = 'SELECT * FROM users';
  const [rows] = await promisePool.query(sql);
  return rows;
}

const getUserById = async (id) =>{
  try{
    const [result] = await promisePool.execute (
      'SELECT * FROM users WHERE user_id = ?',[id]);
      return result[0];
    } catch (e) {
      console.error('error', e.message);
    }
    
  };

 
  // hartaan kaikki käyttäjätiedot, mutta ei salasanaa. Tiedot voidaan hakea vaikka adminille, mutta ei saa hakea salasanaa.
  const listAllUsers = async() => {
    const sql = 'SELECT username, created_at FROM users';
    const [rows] = await promisePool.query(sql);
    return rows;
  };





 // käyttäjätiedot id:llä. Tiedot voidaan hakea vaikka adminille, mutta ei saa hakea salasanaa.
  const addUser = async (user) => {
    const sql = `INSERT INTO users(username,password,email) VALUES (?,?,?)`;
    const params = [user.username,user.password,user.email]
    try {
      const rows = await promisePool.execute(sql,params);
      return rows[0].insertId;
    } catch (e) {
      console.error('error', e.message);
    }
  }
  
  


//Huom: virheenkäsittely puuttuu
const findUserByUserName = async (username) => {
const sql = 'select * FROM users WHERE username = ?';
const [rows] = await promisePool.execute(sql,[username]);
return rows[0]; //palautetaan taulukon eka rivi
};

export {findUserByUserName, getUsers,getUserById,addUser,listAllUsers};