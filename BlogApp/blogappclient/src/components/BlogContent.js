import React from 'react';
import Filter from './Filter';
import Blogs from './Blogs';
import { useSelector } from 'react-redux';

const BlogContent = () => {

  const blogs = useSelector(({ blogs, filter }) => {
    return blogs.filter(b => b.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  });
  const user = useSelector(({ user }) => user);

  return (
    <div>
      <h1>Blogs</h1>
      <div className="row">
        <div className="col-6">
          <Filter />
        </div>
      </div>
      <Blogs
        blogs={blogs}
        user={user}
      />
    </div>

  );
};

export default BlogContent;

