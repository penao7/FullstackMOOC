import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
const MONGODB_URI = process.env.MONGODB_URI;
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

export default {
  MONGODB_URI,
  JWT_SECRET
};