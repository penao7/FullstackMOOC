import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleOnClick, text }) => {
  return (
    <div>
      <button onClick={() => handleOnClick()}>{text}</button>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0));

  const handleOnClick = () => {
    const newValue = Math.floor(Math.random() * Math.floor(6));
    setSelected(newValue);
  };

  const handleVoteOnClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <Button text='vote' handleOnClick={handleVoteOnClick} />
      <Button text='new anecdote' handleOnClick={handleOnClick} />
      <h1>Anecdote with most votes</h1>
      {
        props.anecdotes[points.findIndex(value => value === Math.max(...points))]
      }
      <p>has {Math.max(...points)} votes</p>
    </div>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)