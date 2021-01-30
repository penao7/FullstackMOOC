import React, { useState } from 'react'
import { useField } from './hooks';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>)}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{ marginTop: '50px' }}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const renderFormControl = (field) => {
    const { reset, ...inputValues } = field;
    return (
      <Form.Control {...inputValues}></Form.Control>
    );
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
            {renderFormControl(content)}
          <Form.Label>author</Form.Label>
            {renderFormControl(author)}
          <Form.Label>url for more info</Form.Label>
            {renderFormControl(info)}
        </Form.Group>
        <Button type="submit" variant="primary">create</Button>
        <Button type="button" variant="warning" onClick={() => resetFields()}>reset</Button>
      </Form>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  );
};

const Navigator = ({ anecdotes, addNew, message }) => {

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null;

  return (
    <div>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
    </div>
  );
};

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  let timer;

  const [notification, setNotification] = useState('')

  const history = useHistory();

  const showNotification = (message) => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      setNotification('');
    }, 5000);

    setNotification(message);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(`a new anecote ${anecdote.content} created!`)
    history.push('/');
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <Alert variant="success">{notification}</Alert> : ''}
      <Navigator anecdotes={anecdotes} addNew={addNew} />
      <Footer />
    </div>
  )
}

export default App;
