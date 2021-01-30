# Blog App Client

This app is meant to run together with [Blog App Server](/BlogApp/blogappserver). There are currently no signup form available, but for creating a user it is possible to 
send a POST request to a http://localhost:3001/api/users endpoint to create a user when the server is running. 

Example JSON-object for the request could look like this:

```
{ "name": "tester", "username": "example", "password": "password" }
```

App can be ran by using commands

```
$ npm install
$ npm run start 
```

Tests for the app are made by using [cypress](https://www.cypress.io/) and can be used by installing dev dependencies and running command

```
$ cypress:open
```
