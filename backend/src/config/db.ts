import { Pool } from "pg";
import * as env from "dotenv";

env.config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
};

export const pool = new Pool(devConfig);
