import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>;
const Button = ({ handleClick, text }) => (
  <button name={text} onClick={(e) => handleClick(e)}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad;
  const average = (good - bad) / all
  const positive = good / all * 100 + ' %'

  return (
    <div>
      <h1>statistics</h1>
      {(good === 0 && neutral === 0 && bad === 0)
        ?
        <div>
          <h3>no feedback given</h3>
        </div>
        :
        <table>
          <thead>
            <tbody>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutral' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='all' value={all} />
              <StatisticLine text='average' value={average} />
              <StatisticLine text='positive' value={positive} />
            </tbody>
          </thead>
        </table>
      }
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) => {
    if (e.target.name === 'good') {
      setGood(good + 1);
    };
    if (e.target.name === 'neutral') {
      setNeutral(neutral + 1);
    };
    if (e.target.name === 'bad') {
      setBad(bad + 1);
    };
  };

  return (
    <div>
      <Header />
      <Button text='good' handleClick={handleClick} />
      <Button text='neutral' handleClick={handleClick} />
      <Button text='bad' handleClick={handleClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
