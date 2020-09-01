import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import counterReducer from './reducer/counterReducer';
import Statistics from './components/Statistics';

const Header = () => <h1>give feedback</h1>;
const Button = ({ handleClick, text }) => (
  <button name={text} onClick={(e) => handleClick(e)}>{text}</button>
);

const store = createStore(counterReducer);

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    });
  };

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    });
  };

  const ok = () => {
    store.dispatch({
      type: 'OK'
    });
  };

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    });
  };


  return (
    <div>
      <Header />
      <Button text='good' handleClick={good} />
      <Button text='neutral' handleClick={ok} />
      <Button text='bad' handleClick={bad} />
      <Button text='reset' handleClick={zero} />
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />,
    document.getElementById('root')
  );
};

renderApp()
store.subscribe(renderApp);

