import User from '../../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../util/validators.js';

const generateToken = user =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

const userResolvers = {
  Mutation: {
    // Register User
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Error', {
          errors,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        hashedPassword,
        createdAt: new Date(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    // Login User
    login: async (_, { username, password }, context, info) => {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Error', {
          errors,
        });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', {
          errors,
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong Credentials';
        throw new UserInputError('Wrong Credentials', { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

export default userResolvers;
