# Blog-App Client

This app is meant to run together with [Blog-App Server](/BlogApp/blogappserver). There are currently no signup form available, but for creating a user it is possible to 
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

Tests for the app are implemented by using [cypress](https://www.cypress.io/).

To run cypress tests, dependencies had to be installed and both server and client must be running.

Run tests in browser:

```
$ npm run cypress open
```

or in terminal:

```
$ npm run test:e2e
```
