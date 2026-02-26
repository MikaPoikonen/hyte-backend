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
  next();
};

export {validationErrorHandler};
