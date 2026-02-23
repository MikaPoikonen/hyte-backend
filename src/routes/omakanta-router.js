import express from 'express';
import { getAllHealthStats,postHealthStats } from '../controllers/omakanta-contoller.js';
const omakantaRouter = express.Router();

omakantaRouter.route('/stats').get(getAllHealthStats).post(postHealthStats);

export default omakantaRouter;