import dotenv from 'dotenv';
dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT;

if (process.env.NODE_ENV.trim() === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

let SECRET = process.env.SECRET;

export default {
  MONGODB_URI,
  PORT,
  SECRET,
};