import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published 
    author {
      name
    }
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      name,
      born,
      bookCount
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const FIND_BOOK = gql`
  query getBookByTitle($title: String!) {
    allBooks(title: $title) {
        ...BookDetails
      }
  }
  ${BOOK_DETAILS}
`

export const GET_GENRES = gql`
  query {
    allBooks {
      id
      genres
      }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query getBookByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(
      name: $name, 
      born: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_USER = gql`
  query getUser {
    me {
      username, 
      favoriteGenre
    }
  }
`