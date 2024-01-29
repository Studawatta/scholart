import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
  PORT: port(),
  DB_HOST: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DATABASE: str(),
  JWT_SECRET: str(),
});
