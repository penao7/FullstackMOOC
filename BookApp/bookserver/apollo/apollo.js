import apollo from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import config from '../utils/config.js';

const { ApolloServer } = apollo;
const JWT_SECRET = config.JWT_SECRET;

// GraphQl

import resolvers from './resolvers/index.js';
import typeDefs from './schema/index.js';

// Mongoose

import Book from '../models/bookSchema.js';
import User from '../models/userSchema.js';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message
    };
  },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    const batchBookCounts = async (keys) => {
      const books = await Book.find({});
      return keys.map(k => books.filter(b => b.author.equals(k)).length);
    };

    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User
        .findById(decodedToken.id);

      return { currentUser, loader: new DataLoader(keys => batchBookCounts(keys)) };
    }

    return { loader: new DataLoader(keys => batchBookCounts(keys)) };
  }
});