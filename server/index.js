import 'dotenv/config';
import env from './utils/validateEnv.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoute from './routes/auth.route.js';
import teacherRoute from './routes/teacher.route.js';
import studentRoute from './routes/student.route.js';
import classRoute from './routes/class.route.js';

const port = env.PORT;

const app = express();

const _dirname = path.resolve();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/teacher', teacherRoute);
app.use('/api/class', classRoute);
app.use('/api/student', studentRoute);

app.use(express.static(path.join(_dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

//error handing middleware
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
