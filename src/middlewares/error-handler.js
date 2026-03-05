import {validationResult} from 'express-validator';

/**
 * Middleware checking all input validation errors
 * @param {*} req https request
 * @param {*} res http response
 * @param {*} next  for calling next function in middleware chain
 * @returns 
 */

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log('validation errors', errors);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({message: 'invalid input data', errors: errors.array()});
  }
  next(); //seuraavalle middlewarella jos ei parametrille
};
/**
 * default middleware for 404 request
 * @param {*} req https request
 * @param {*} res http response
 * @param {*} next  for calling next function in middleware chain
 * @returns 
 */
//siirretään err tätä alemmalle handlerille
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
* Custom default middleware for handling errors
*/
/**
 * Middleware checking all input validation errors
 * @param {*} req https request
 * @param {*} res http response
 * @param {*} next  for calling next function in middleware chain
 * @returns 
 */

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
};

export {validationErrorHandler,notFoundHandler,errorHandler};
