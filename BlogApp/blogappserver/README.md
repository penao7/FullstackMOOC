# Book-App Server

This server is implemented using [Apollo GraphQL](/https://www.apollographql.com/) server for [Blog-App Client](/BlogApp/blogappclient).

## Usage

```
$ npm install
$ npm run start
```

Now you can access GraphQL playground at http://localhost:4000/graphql.

If a token is needed, you can add it to HTTP HEADERS tab below the query editor after logging in (see below):

```graphql
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```

### Users

Signup:

```graphql  
mutation { 
  createUser(username: "test", favoriteGenre: "example") {
      id
      username
      favoritegenre
  }
}
```

Login (to get token):

```graphql
mutation {
  login(username: "test", password: "example") {
  value 
  }
}
```

To get information from the token:

```graphql
query {
  me {
    username, 
    id, 
    favoriteGenre
  }
}
```

### Books

Get all books:

```graphql
query {
  allBooks { 
    docs {
      title
      author
      published
      genres
      id
     }
  }
}
```

Add a book (token required):

```graphql
mutation {
  addBook(title: "Gone with the Wind", author: "Margaret Mitchell", published: 1936, genres: "Romance") {
  	id
  	published
  	genres
  	title
  	author {
      name
      born
    }
  }
}
```
If there is no author with that name already, it will be automatically created.

Get the total number of books added:

```graphql
query {
  bookCount
}
```

### Authors

Get all authors:

```graphql
query {
  allAuthors{
    name
    bookCount
    born
  }
}
```

Change author born year by name (token required):

```graphql
mutation {
  editAuthor(name: "Margaret Mitchell", born: 1900) {
    name,
    born
  }
}
```


Get the total number of books added:

```graphql
query {
  authorCount
}

