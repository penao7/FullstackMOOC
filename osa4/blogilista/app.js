import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import middleware from './utils/middleware.js';
import blogRouter from './controllers/blogRouter.js';
import userRouter from './controllers/userRouter.js';
import loginRouter from './controllers/login.js';
import * as database from './utils/database.js';

const app = express();

database.connect();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


export default app;