const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('No estas autenticado, no hay JWT');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let verifyToken;
  try {
    verifyToken = jwt.verify(token, 'SECRETKEY');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!verifyToken) {
    const error = new Error('No autenticado');
    error.statusCode = 401;
    throw error;
  }
  next();
};
