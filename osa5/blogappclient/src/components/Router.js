import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Users from './Users.js';
import User from './User.js';
import SingleBlog from './SingleBlog';
import BlogContent from './BlogContent';
import { useSelector } from 'react-redux';

const NavRouter = () => {

  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);
  const userMatch = useRouteMatch('/users/:id');
  const blogMatch = useRouteMatch('/blogs/:id');


  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <BlogContent />
        </Route>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/blogs/:id'>
          <SingleBlog blog={blog} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
      </Switch>
    </div>
  );
};

export default NavRouter;