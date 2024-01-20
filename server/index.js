import 'dotenv/config';
import env from './utils/validateEnv.js';
import express from 'express';

const port = env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from server!');
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
