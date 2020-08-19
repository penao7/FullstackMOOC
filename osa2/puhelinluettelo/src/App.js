import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState('');
  const [message, setMessage] = useState('');
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  };

  const updatePerson = () => {
    const id = (persons.find(person => person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()).id);
    personService
      .update(id, newPerson)
      .then(newData => {
        setPersons(persons.map(person => person.id !== id ? person : newData));
        messageHandler(`Contact ${newPerson.name} updated!`)
      })
      .then(setNewPerson({ name: '', number: '' }))
      .catch(err => messageHandler(null, `Error with updating person: ${err}`))
  };

  const addPerson = (e) => {
    e.preventDefault();
    return (
      persons.some(person => person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase())
        ?
        window.confirm(`Contact ${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
          ? updatePerson()
          : ""
        :
        personService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            messageHandler(`Contact ${returnedPerson.name} added succesfully`)
            setNewPerson({ name: '', number: '' });
          })
          .catch(err => messageHandler(null, `Error with adding person: ${err}`))
    );
  };

  const messageHandler = (success, err) => {
    setTimeout(() => {
      setMessage('')
    }, 5000);

    return (
      success 
      ? setMessage({status: true, message: success})
      : setMessage({status: false, message: err})
    );
  };

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id);
    return (
      window.confirm(`Are you sure you want to delete ${person.name}`)
        ?
        personService
          .deletePerson(id)
          .then(res => {
            setPersons(persons.filter(person => person.id !== id));
            messageHandler(`Contact ${person.name} deleted`);
          })
          .catch(err => messageHandler(null, `Error deleting person: ${err}`))
        : ""
    );
  };

  const handleInputChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    if (typeof e.target.name !== 'string' || e.target.value.length === 0) {
      return setFilteredPersons('');
    };
    const filteredList = persons.filter(person => person.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    setFilteredPersons(filteredList);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message
        ?
        <Notification message={message} />
        : ''
      }
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleInputChange={handleInputChange}
        addPerson={addPerson}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons ? filteredPersons : persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App
