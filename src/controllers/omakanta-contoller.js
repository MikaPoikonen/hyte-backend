import { listAllHealthyStats,addHealthyStats,listAllHealthyStatsByUser,findUserByUserName } from "../models/omakanta-model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const getAllHealthStats = async (req,res) => {
    const result = await listAllHealthyStats();
    if (!result.error){
        res.json(result)
    }
    else {
        res.status(500);
        res.json(result);
    }
}


const getHealthStatsByUser = async (req,res) => {

  const result = await listAllHealthyStatsByUser(req.user.user_id);
  if (!result.error){
    res.json(result)
  } else {
    res.status(500);
    res.json(result)
  }
}




const postHealthStats = async(req,res) => {
    const {user_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date}=req.body;
    if (user_id && calories_eaten && calories_used && steps && weight_today){
        const result = await addHealthyStats ({user_id,calories_eaten,calories_used,steps,weight_today,mood,weight,sleep_hours,notes,entry_date});
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


const postLogin = async (req, res) => {
  const {username, password} = req.body;

  const user = await findUserByUserName(username);
  console.log(user);

  // haetaan käyttäjä-objekti käyttäjän nimen perusteella

  if (user) {
    // Jos asiakkaalta tullut salasana vastaa tietokannasta haettua salasana tiivistettä ehto on TRUE:
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      // TÄssä kohtaa luodaan JWT token käyttämällä sercret fron .env file
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }); // tehdään muuttuja, jwt käyttöön. Haetaan user, procress ja metodi. Aika kauanko voimassa
      return res.json({message: 'login ok', user, token});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};


const getMe = (req, res) => {
  console.log('getMe', req.user);
  console.log('getMe', req.user.password);
  res.json(req.user); //lisätään objekti authentication tiedostosta.
}








export {getAllHealthStats,postHealthStats,getHealthStatsByUser,postLogin,getMe};