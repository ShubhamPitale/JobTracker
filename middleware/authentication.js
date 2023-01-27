const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authorizationMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authorization invalid');
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.UserId, name: decoded.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authorization invalid');
  }
};

module.exports = authorizationMiddleware;
