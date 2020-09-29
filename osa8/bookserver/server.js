const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose');
const Book = require('./models/bookSchema');
const Author = require('./models/authorSchema');
const User = require('./models/userSchema');
const jwt = require('jsonwebtoken')
const pubsub = new PubSub();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String, title: String): [Book!]!
    allAuthors(author: String): [Author!]!
    me: User
    genres: [String!]
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      born: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
    authorAdded: Author!
  }


`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      if (args.author && args.genre) {
        return Book.find({ author: args.author, genres: { $in: [args.genre] } }).populate('author')
      };

      if (args.title) {
        return Book.find({ title: args.title }).populate('author')
      };

      if (args.author) {
        const author = Author.findOne({ name: args.author })
        return Book.findById(author._id).populate('author')
      };

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      };

      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      const newBook = new Book({ ...args });
      const user = currentUser;

      if (!user) {
        throw new AuthenticationError('not authenticated')
      };

      const checkedAuthor = await Author.findOne({ name: args.author });

      if (!checkedAuthor) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save();

        pubsub.publish('AUTHOR_ADDED', { authorAdded: newAuthor})
      };

      try {
        const author = await Author.findOne({ name: args.author });
        newBook.author = author
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      };

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      const user = currentUser;
      
      if (!user) {
        throw new AuthenticationError('not authenticated')
      };

      const author = await Author.findOne({ name: args.name });
      author.born = args.born;

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      };

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(err => {
          throw new UserInputError(err.message, {
            invalidArgs: args
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      };

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) }

    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_ADDED'])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id);
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
})