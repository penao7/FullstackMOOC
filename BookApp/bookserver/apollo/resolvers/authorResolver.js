import apollo from 'apollo-server-express';

const { AuthenticationError, UserInputError } = apollo;

import Author from '../../models/authorSchema.js';

export default {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (author, args, { loader }) => {
      return await loader.load(author._id);
    }
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      const user = currentUser;

      if (!user) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.born;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return author;
    }
  }
};
