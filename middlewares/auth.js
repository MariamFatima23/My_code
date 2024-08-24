import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      response: 'Unauthorized',
      message: 'Access denied. No token provided.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        response: 'Unauthorized',
        message: 'Invalid token.'
      });
    }
    req.user = decoded;
    next();
  });
};
