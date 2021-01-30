import apollo from 'apollo-server-express';
const { gql } = apollo;

export default gql`

  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String, title: String): [Book!]!
    genres: [String!]
  }

  extend type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
  }

  extend type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]!
    id: ID!
  }
`;
