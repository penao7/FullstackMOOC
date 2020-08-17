import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const course = 'Half Stack application development';
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10,
  },
  {
    name: 'Using props to pass data',
    exercises: 7,
  },
  {
    name: 'State of a component',
    exercises: 14,
  }];


  const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
  };

  const Part = ({ name, exercises }) => (
    <div>
      <p>{name} {exercises}</p>
    </div>
  );

  const Content = ({ parts }) => (
    <div>
      {
        parts.map(part => (
          <div key={part.name}>
            <Part name={part.name} exercises={part.exercises} />
          </div>
        ))
      }
    </div>
  );

  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((a, b) => { return a + b.exercises }, 0);

    console.log(totalExercises);
    return (
      <p>Total number of exercises: {totalExercises}</p>
    )
  };



  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))