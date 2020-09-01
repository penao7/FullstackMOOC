import dotenv from 'dotenv';
dotenv.config();

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  console.log(...params);
};

export default {
  info,
  error
};