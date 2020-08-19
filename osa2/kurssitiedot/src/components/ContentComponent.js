import React from 'react';
import Part from './PartComponent';

const Content = ({ parts }) => {

  const totalExercises = parts.reduce((a, b) => { return a + b.exercises}, 0);

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <h4>total of {totalExercises} exercises</h4>
    </div>
  )
};

export default Content;