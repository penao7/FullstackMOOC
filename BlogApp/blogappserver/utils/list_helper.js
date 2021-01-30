import _ from 'lodash';

export const dummy = () => {
  return 1;
};

export const totalLikes = (blogs) => {
  return _.reduce(blogs, (a, blog) => { return a + blog.likes; }, 0);
};

export const favoriteBlog = (blogs) => {
  return _.filter(blogs, { 'likes': _.maxBy(blogs, 'likes').likes })[0];
};

export const mostBlogs = (blogs) => {

  const getTotalBlogsByAuthor = () => {
    return _.reduce(_.countBy(blogs, 'author'), (authors, value, key) => {

      authors[key] = { author: key, blogs: value };

      return authors;

    }, {});
  };

  return _.maxBy(_.map(
    getTotalBlogsByAuthor(),
    b => _.pick(b, 'author', 'blogs')), 'blogs');

};

export const mostLikes = (blogs) => {

  const getTotalLikesByAuthor = () => {

    return _.reduce(_.groupBy(blogs, 'author'), (blogs, value, key) => {

      const totalLikes = value.reduce((a, b) => {
        return a + b.likes;
      }, 0);

      blogs[key] = { author: key, likes: totalLikes };

      return blogs;

    }, {});
  };

  return _.maxBy(_.map(
    getTotalLikesByAuthor(),
    blog => _.pick(blog, 'author', 'likes')), 'likes');

};





