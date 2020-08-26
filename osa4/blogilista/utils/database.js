import mongoose from 'mongoose';
import logger from './logger.js';
import config from './config.js';

mongoose.set('useCreateIndex', true);

export const connect = async () => {
  await mongoose.connect(config.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false

    });
  logger.info('connected to MongoDB');
};
