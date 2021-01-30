import apollo from 'apollo-server-express';

const { AuthenticationError, UserInputError, PubSub } = apollo;
const pubsub = new PubSub();

import Book from '../../models/bookSchema.js';
import Author from '../../models/authorSchema.js';

export default {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, { author, genre, title }) => {

      if (author && genre) {
        return Book.find({ author: author, genres: { $in: [genre] } }).populate('author');
      }

      if (title) {
        return Book.find({ title: title }).populate('author');
      }

      if (author) {
        const author = Author.findOne({ name: author });
        return Book.findById(author._id).populate('author');
      }

      if (genre) {
        return Book.find({ genres: { $in: [genre] } }).populate('author');
      }

      return Book.find({}).populate('author');
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (isNaN(args.published)) {
        throw new AuthenticationError('published not number');
      }

      const newBook = new Book({ ...args });
      const user = currentUser;

      if (!user) {
        throw new AuthenticationError('not authenticated');
      }

      const checkedAuthor = await Author.findOne({ name: args.author });

      if (!checkedAuthor) {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
      }

      try {
        const author = await Author.findOne({ name: args.author });
        newBook.author = author;
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
};
