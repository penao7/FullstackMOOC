import React from 'react';

const StatisticLine = ({ text, value }) => (
  <tr key='testi'>
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

export default Statistics;