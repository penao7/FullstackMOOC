import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../utils/list_helper.js';
import { initialBlogs2 } from './test_helper.js';

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy();
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{ likes: 5 }];
    const result = totalLikes(blogs);
    expect(result).toBe(5);
  });
  test('of a bigger list is calculated right', () => {
    const result = (totalLikes(initialBlogs2));
    expect(result).toBe(44);
  });
});

describe('favoriteBlog', () => {
  test('mostLikes', () => {
    const result = mostBlogs(initialBlogs2);
    expect(result).toEqual({
      author: 'Testaaja2',
      blogs: 2
    });
  });
});

describe('mostLikes', () => {
  test('who has most likes', () => {
    const result = mostLikes(initialBlogs2);
    expect(result).toEqual({
      author: 'Testaaja2',
      likes: 22,
    });
  });
});


