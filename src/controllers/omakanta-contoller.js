import { listAllHealthyStats,addHealthyStats } from "../models/omakanta-model.js";

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

const postHealthStats = async(req,res) => {
    const {user_id,calories_eaten,calories_used,steps,weight_today}=req.body;
    if (user_id && calories_eaten && calories_used && steps && weight_today){
        const result = await addHealthyStats ({user_id,calories_eaten,calories_used,steps,weight_today});
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








export {getAllHealthStats,postHealthStats};