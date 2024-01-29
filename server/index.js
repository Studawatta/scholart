import 'dotenv/config';
import env from './utils/validateEnv.js';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js';

const port = env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);

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
