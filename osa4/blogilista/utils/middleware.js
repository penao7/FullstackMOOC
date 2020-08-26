import logger from './logger.js';

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('---');
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.name === 'CastError') {
    return res.status(404).send({
      error: 'malformatted id'
    });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    });
  };

  next(err);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  };
  next();
};

export default {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor
};
