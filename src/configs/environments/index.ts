import * as dotenv from 'dotenv';
import * as Joi from 'joi';

// config use env
dotenv.config();

// environment
const NODE_ENV: string = Joi.string()
  .valid('development', 'production', 'test')
  .required()
  .validate(process.env.NODE_ENV).value;
const PORT: number = Joi.number().required().validate(process.env.PORT).value;
const SERVER_URL: string = Joi.string()
  .required()
  .validate(process.env.SERVER_URL).value;

// session
const SESSION_SECRET: string = Joi.string()
  .required()
  .validate(process.env.SESSION_SECRET).value;

// postgres
const POSTGRES_HOST: string = Joi.string()
  .required()
  .validate(process.env.POSTGRES_HOST).value;
const POSTGRES_PORT: number = Joi.number()
  .required()
  .validate(process.env.POSTGRES_PORT).value;
const POSTGRES_USER: string = Joi.string()
  .required()
  .validate(process.env.POSTGRES_USER).value;
const POSTGRES_PASSWORD: string = Joi.string()
  .required()
  .validate(process.env.POSTGRES_PASSWORD).value;
const POSTGRES_DB: string = Joi.string()
  .required()
  .validate(process.env.POSTGRES_DB).value;

// redis
const REDIS_HOST: string = Joi.string()
  .required()
  .validate(process.env.REDIS_HOST).value;
const REDIS_PORT: number = Joi.number()
  .required()
  .validate(process.env.REDIS_PORT).value;

// throttle
const THROTTLE_TTL: number = Joi.number()
  .required()
  .validate(process.env.THROTTLE_TTL).value;
const THROTTLE_LIMIT: number = Joi.number()
  .required()
  .validate(process.env.THROTTLE_LIMIT).value;

// jwt
const SECRET_JWT: string = Joi.string()
  .required()
  .validate(process.env.SECRET_JWT).value;
const SECRET_KEY: string = Joi.string()
  .required()
  .validate(process.env.SECRET_KEY).value;
const SECRET_KEY_IV: string = Joi.string()
  .required()
  .validate(process.env.SECRET_KEY_IV).value;
const TOKEN_BUFFER: string = Joi.string()
  .required()
  .validate(process.env.TOKEN_BUFFER).value;
const ACCESS_TOKEN_EXPIRATION_TIME: string = Joi.string()
  .required()
  .validate(process.env.ACCESS_TOKEN_EXPIRATION_TIME).value;
const REFRESH_TOKEN_EXPIRATION_TIME: string = Joi.string()
  .required()
  .validate(process.env.REFRESH_TOKEN_EXPIRATION_TIME).value;

// cloudinary
const FOLDER_NAME: string = Joi.string()
  .required()
  .validate(process.env.FOLDER_NAME).value;
const CLOUD_NAME: string = Joi.string()
  .required()
  .validate(process.env.CLOUD_NAME).value;
const API_KEY: string = Joi.string()
  .required()
  .validate(process.env.API_KEY).value;
const API_SECRET: string = Joi.string()
  .required()
  .validate(process.env.API_SECRET).value;

// mail
const MAIL_HOST: string = Joi.string()
  .required()
  .validate(process.env.MAIL_HOST).value;
const MAIL_PORT: number = Joi.number()
  .required()
  .validate(process.env.MAIL_PORT).value;
const MAIL_USER: string = Joi.string()
  .required()
  .validate(process.env.MAIL_USER).value;
const MAIL_PASSWORD: string = Joi.string()
  .required()
  .validate(process.env.MAIL_PASSWORD).value;

// language
const FALLBACK_LANGUAGE: string = Joi.string()
  .required()
  .validate(process.env.FALLBACK_LANGUAGE).value;

// speakeasy
const SPEAKEASY_SECRET: string = Joi.string()
  .required()
  .validate(process.env.SPEAKEASY_SECRET).value;
const SPEAKEASY_LENGTH: number = Joi.number().validate(
  process.env.SPEAKEASY_LENGTH,
).value;
const SPEAKEASY_ENCODING: string = Joi.string().validate(
  process.env.SPEAKEASY_ENCODING,
).value;
const SPEAKEASY_ALGORITHM: string = Joi.string().validate(
  process.env.SPEAKEASY_ALGORITHM,
).value;
const SPEAKEASY_STEP: number = Joi.number().validate(
  process.env.SPEAKEASY_STEP,
).value;

// google
const GOOGLE_CLIENT_ID: string = Joi.string()
  .required()
  .validate(process.env.GOOGLE_CLIENT_ID).value;
const GOOGLE_CLIENT_SECRET: string = Joi.string()
  .required()
  .validate(process.env.GOOGLE_CLIENT_SECRET).value;
const GOOGLE_CALLBACK_URL: string = Joi.string()
  .required()
  .validate(process.env.GOOGLE_CALLBACK_URL).value;

// Algorithm
const ALGORITHM_AES: string = Joi.string()
  .required()
  .validate(process.env.ALGORITHM_AES).value;
const ALGORITHM_SHA: string = Joi.string()
  .required()
  .validate(process.env.ALGORITHM_SHA).value;

// Discord
const TOKEN_BOT: string = Joi.string()
  .required()
  .validate(process.env.TOKEN_BOT).value;

export {
  NODE_ENV,
  PORT,
  SERVER_URL,
  SESSION_SECRET,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  REDIS_HOST,
  REDIS_PORT,
  THROTTLE_TTL,
  THROTTLE_LIMIT,
  SECRET_JWT,
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
