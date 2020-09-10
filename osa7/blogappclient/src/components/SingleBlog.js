import React from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog, addComment } from '../redux/actioncreators';
import { useField } from '../hooks';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

const SingleBlog = ({ blog }) => {

  const dispatch = useDispatch();

  const handleLike = () => {
    let newBlog = blog;
    newBlog.likes = newBlog.likes + 1;
    dispatch(updateBlog(blog.id, newBlog));
    console.log(newBlog);
  };

  const comment = useField('text');

  const finalInput = (input) => {
    const { reset, ...props } = input;
    return <Form.Control {...props} />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment.value
    };
    dispatch(addComment(blog.id, newComment));
  };

  return (
    blog
      ?
      <div style={{ marginTop: '30px' }} className="container">
        <div className="col-12 col-md-6 offset-md-3">
          <Card>
            <Card.Body>
              <div className="row">
                <div className="col-12">
                  <Card.Title
                    as="h2"
                    className="text-center ml-5"
                  >
                    {blog.title}
                    <Button
                      variant="success"
                      className="btn-sm float-right"
                      onClick={() => handleLike()}
                    >
                      Like
                  </Button>
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted small text-right">{blog.author}
                  </Card.Subtitle>
                </div>
              </div>
              <Card.Text>
                {`Likes ${blog.likes}`}
              </Card.Text>
              <Card.Text>
              </Card.Text>
              <div className="row">
                <div className="col-md-4">
                  <Card.Link href={blog.url}>Link</Card.Link>
                </div>
                <div className="col-md-8 text-right">
                  added by: {<Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>}
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title as='h3'>
                Comments
              </Card.Title>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <Form>
                      <Form.Group>
                        <Form.Label>Add a comment</Form.Label>
                        {finalInput(comment)}
                      </Form.Group>
                      <Button onClick={handleSubmit} className="btn-sm float-right mt-2">Submit</Button>
                    </Form>
                  </div>
                </div>
              </div>
              <Card.Text>
                {
                  blog.comments.map(comment => (
                    <li>{comment.comment}</li>
                  ))
                }
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      : ''
  );

};

export default SingleBlog;