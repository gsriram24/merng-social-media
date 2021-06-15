import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

const checkAuth = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error('Not Authorized, no token.');
  }
  throw new Error('Not Authorized, no token.');
};

export default checkAuth;
