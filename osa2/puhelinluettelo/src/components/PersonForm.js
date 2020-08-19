import React from 'react';

const PersonForm = ({ addPerson, handleInputChange, newPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newPerson.name} name='name' onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={newPerson.number} name='number' onChange={handleInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
