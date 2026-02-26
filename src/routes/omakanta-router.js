import express from 'express';
import {
  getAllHealthStats,
  postHealthStats,
  getHealthStatsByUser,
  postLogin,
  getMe,
} from '../controllers/omakanta-contoller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';
const omakantaRouter = express.Router();

omakantaRouter
  .route('/stats')
  .get(getAllHealthStats)
  //ToDO: add validators here
  .post(
    body('weight_today').trim().isLength({min: 2, max: 400}).isNumeric(),
    body('steps').trim().isLength({min: 1, max: 300000}).isNumeric(),
    body('calories_eaten').trim().isLength({min: 0, max: 300000}).isNumeric(),
    body('calories_used').trim().isLength({min: 0, max: 300000}).isNumeric(),
    validationErrorHandler,
    postHealthStats,
  );

omakantaRouter.route('/stats/:id').get(authenticateToken, getHealthStatsByUser);

omakantaRouter.get('/stats/me', authenticateToken, getMe);

omakantaRouter.post('/stats/login', postLogin);
export default omakantaRouter;
