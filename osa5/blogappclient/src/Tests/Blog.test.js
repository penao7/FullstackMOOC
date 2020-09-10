import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

let component;

const user = {
  username: 'tester'
};

const blog = {
  id: 1,
  author: 'TestAuthor',
  title: 'test',
  user: 'Tester',
  url: 'http://testUrl/testblog',
  likes: 15
};

let mockHandler;

beforeEach(() => {

  mockHandler = jest.fn();

  component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler}/>
  );
});

test('renders blog', () => {
  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`);
});

test('at start full blog is not displayed', () => {
  const div = component.container.querySelector('.toggableContent');
  expect(div).toHaveStyle('display: none');
});

test('after clicking the button, children are displayed', () => {
  const button = component.getByText('view');
  fireEvent.click(button);

  const div = component.container.querySelector('.toggableContent');
  expect(div).not.toHaveStyle('display: none');
});

test('toggled content can be closed', () => {
  const button = component.getByText('view');
  fireEvent.click(button);

  const view = component.container.querySelector('.toggableContent');
  expect(view).not.toHaveStyle('display: none');

  const hideButton = component.getByText('hide');
  fireEvent.click(hideButton);

  const hide = component.container.querySelector('.toggableContent');
  expect(hide).toHaveStyle('display: none');
});

test('like can be pressed', () => {
  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);

});