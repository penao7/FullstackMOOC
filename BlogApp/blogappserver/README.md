# Blog-App Server

This server is implemented using Node.js together with Express.js for [Blog-App Client](/BlogApp/blogappclient).

To get authorization, a new user needs to be created and token received (see users endpoint).

## Endpoints:

### Users

Get all users

```
GET /api/users
```

To Signup

```
POST /api/users
{ "username": "test", "password": "example" }
```

To Login (and receive token)

```
POST /api/login
{ "username": "test", "password": "example" }
```

### Blogs

Get all blogs
```
GET /api/blogs
```

Add a blog (auth required)
```
POST /api/blogs
{ "author": "test", "title": "example", "url": "http://example.com" }
```

Get blog by ID

```
GET /api/blogs/:id
```

Delete blog by ID (auth required)

```
DELETE /api/blogs/:id
```

Update blog by ID

```
PUT /api/blogs/:id
```

## Comments

Get all comments from specific blog with id
```
GET /api/blogs/:id/comments
```

Add a comment for a specifi blog with id

```
POST /api/blogs/:id/comments
```

Get comment by id

```
GET /api/blogs/:id/:commentId
```

### Testing

Testing is available when NODE_ENV is set as test.

Delete all blogs and users
```
/api/reset
```






