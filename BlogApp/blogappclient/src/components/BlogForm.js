import React, { useState, Fragment } from 'react';
import { useField } from '../hooks/';
import { addBlog } from '../redux/actioncreators';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

const BlogForm = () => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const createBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    toggleModal();
    return (
      dispatch(addBlog(newBlog))
    );
  };

  const finalInput = (field, id) => {
    const { reset, ...props } = field;
    return <Form.Control id={id} {...props} />
  };

  return (
    <Fragment>
      <span onClick={toggleModal}>
        Add Blog
      </span>

      <Modal show={show} onHide={toggleModal}>
        <Modal.Body>
          <Modal.Title className="text-center">
            Add blog
          </Modal.Title>
          <Form>
            <Form.Group>
              <Form.Label>title</Form.Label>
              {finalInput(title, 'title')}
            </Form.Group>
            <Form.Group>
              <Form.Label>author</Form.Label>
              {finalInput(author, 'author')}
            </Form.Group>
            <Form.Group>
              <Form.Label>url</Form.Label>
              {finalInput(url, 'url')}
            </Form.Group>
            <Button onClick={toggleModal} variant="secondary">
              close
          </Button>
            <Button onClick={createBlog} id='blog-submit' className="float-right" variant="primary">
              submit
          </Button>
          </Form >
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default BlogForm;