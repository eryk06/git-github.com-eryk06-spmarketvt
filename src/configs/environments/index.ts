import * as dotenv from 'dotenv';

// config use env
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV;
const PORT: number = +process.env.PORT;
const SERVER_URL: string = process.env.SERVER_URL;

// session
const SESSION_SECRET: string = process.env.SESSION_SECRET;

// postgres master
const POSTGRESQL_REPLICATION_USER: string =
  process.env.POSTGRESQL_REPLICATION_USER;
const POSTGRESQL_REPLICATION_PASSWORD: string =
  process.env.POSTGRESQL_REPLICATION_PASSWORD;
const POSTGRESQL_USERNAME: string = process.env.POSTGRESQL_USERNAME;
const POSTGRESQL_PASSWORD: string = process.env.POSTGRESQL_PASSWORD;
const POSTGRESQL_DATABASE: string = process.env.POSTGRESQL_DATABASE;
const POSTGRESQL_MASTER_HOST: string = process.env.POSTGRESQL_MASTER_HOST;
const POSTGRESQL_MASTER_PORT_NUMBER: number =
  +process.env.POSTGRESQL_MASTER_PORT_NUMBER;

// postgres slave
const POSTGRESQL_SLAVE_HOST: string = process.env.POSTGRESQL_SLAVE_HOST;
const POSTGRESQL_SLAVE_PORT_NUMBER: number =
  +process.env.POSTGRESQL_SLAVE_PORT_NUMBER;

// redis
const REDIS_HOST: string = process.env.REDIS_HOST;
const REDIS_PORT: number = +process.env.REDIS_PORT;

// throttle
const THROTTLE_TTL: number = +process.env.THROTTLE_TTL;
const THROTTLE_LIMIT: number = +process.env.THROTTLE_LIMIT;

// jwt
const SECRET_KEY: string = process.env.SECRET_KEY;
const SECRET_KEY_IV: string = process.env.SECRET_KEY_IV;
const TOKEN_BUFFER: string = process.env.TOKEN_BUFFER;
const ACCESS_TOKEN_EXPIRATION_TIME: string =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME: string =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME;

// cloudinary
const FOLDER_NAME: string = process.env.FOLDER_NAME;
const CLOUD_NAME: string = process.env.CLOUD_NAME;
const API_KEY: string = process.env.API_KEY;
const API_SECRET: string = process.env.API_SECRET;

// mail
const MAIL_HOST: string = process.env.MAIL_HOST;
const MAIL_PORT: number = +process.env.MAIL_PORT;
const MAIL_USER: string = process.env.MAIL_USER;
const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD;

// language
const FALLBACK_LANGUAGE: string = process.env.FALLBACK_LANGUAGE;

// speakeasy
const SPEAKEASY_SECRET: string = process.env.SPEAKEASY_SECRET;
const SPEAKEASY_LENGTH: number = +process.env.SPEAKEASY_LENGTH;
const SPEAKEASY_ENCODING: string = process.env.SPEAKEASY_ENCODING;

const SPEAKEASY_ALGORITHM: string = process.env.SPEAKEASY_ALGORITHM;
const SPEAKEASY_STEP: number = +process.env.SPEAKEASY_STEP;

// google
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL: string = process.env.GOOGLE_CALLBACK_URL;

// Algorithm
const ALGORITHM_AES: string = process.env.ALGORITHM_AES;
const ALGORITHM_SHA: string = process.env.ALGORITHM_SHA;

// Discord
const TOKEN_BOT: string = process.env.TOKEN_BOT;

export {
  NODE_ENV,
  PORT,
  SERVER_URL,
  SESSION_SECRET,
  POSTGRESQL_REPLICATION_USER,
  POSTGRESQL_REPLICATION_PASSWORD,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
  POSTGRESQL_MASTER_HOST,
  POSTGRESQL_MASTER_PORT_NUMBER,
  POSTGRESQL_SLAVE_HOST,
  POSTGRESQL_SLAVE_PORT_NUMBER,
  REDIS_HOST,
  REDIS_PORT,
  THROTTLE_TTL,
  THROTTLE_LIMIT,
  SECRET_KEY,
  SECRET_KEY_IV,
  TOKEN_BUFFER,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
  FOLDER_NAME,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  FALLBACK_LANGUAGE,
  SPEAKEASY_SECRET,
  SPEAKEASY_LENGTH,
  SPEAKEASY_ENCODING,
  SPEAKEASY_ALGORITHM,
  SPEAKEASY_STEP,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  ALGORITHM_AES,
  ALGORITHM_SHA,
  TOKEN_BOT,
};
