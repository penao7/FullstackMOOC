import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn();

  const component = render(
    <BlogForm addBlog={addBlog} />
  );

  const urlInput = component.getByRole('textbox', { name: /url/i });
  const titleInput = component.getByRole('textbox', { name: /title/i });
  const authorInput = component.getByRole('textbox', { name: /author/i });

  fireEvent.change(urlInput, {
    target: { value: 'http://test.url/testblog' }
  });
  fireEvent.change(titleInput, {
    target: { value: 'TEST' }
  });
  fireEvent.change(authorInput, {
    target: { value: 'tester' }
  });

  const button = component.getByText('add');
  fireEvent.click(button);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('TEST');
  expect(addBlog.mock.calls[0][0].author).toBe('tester');
  expect(addBlog.mock.calls[0][0].url).toBe('http://test.url/testblog');

});

