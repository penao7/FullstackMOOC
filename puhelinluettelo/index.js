import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Person from './models/person.js';

const app = express();
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return '';
  }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.send(people);
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {

  if (!req.body.name || !req.body.number) {
    let err = new Error('name or number missing');
    err.status = 404;
    next(err);
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  });

  person
    .save(err => {
      if(err) {
        next(err);
      } else {
        res.send(person);
      }
    });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        res.send(person);
      } else {
        const err = new Error('Person not found');
        err.name = 'CastError';
        next(err);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndUpdate(id, { number: `${req.body.number}` },
    { new: true,
      runValidators: true,
      context: 'query'
    })
    .then(updatedPerson => {
      res.send(updatedPerson);
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send(`Phonebook has info for ${persons.length} people<br/><br/>${new Date()}`);
    });
});

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log((err));

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message });
  }

  next(err);
};

app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});