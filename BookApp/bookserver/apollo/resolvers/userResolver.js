import apollo from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import config from '../../utils/config.js';

const { UserInputError } = apollo;
const JWT_SECRET = config.JWT_SECRET;

import User from '../../models/userSchema.js';

export default {
  Query: {
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save()
        .catch(err => {
          throw new UserInputError(err.message, {
            invalidArgs: args
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };

    }
  },
};
