import { Global, Module } from '@nestjs/common';
import * as Joi from 'joi';
import {
  ConfigService,
  ConfigModule as NestConfigModule
} from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development').required(),
        PORT: Joi.number().default(4000).required(),
        SERVER_URL: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        POSTGRES_HOST: Joi.string().default('postgres').required(),
        POSTGRES_PORT: Joi.number().default(5432).required(),
        POSTGRES_USER: Joi.string().default('postgres').required(),
        POSTGRES_PASSWORD: Joi.string().default('postgres').required(),
        POSTGRES_DB: Joi.string().default('spmarket').required(),
        REDIS_HOST: Joi.string().default('redis').required(),
        REDIS_PORT: Joi.number().default(6379).required(),
        THROTTLE_TTL: Joi.number().default(60000).required(),
        THROTTLE_LIMIT: Joi.number().default(20).required(),
        TOKEN_BUFFER: Joi.string().default('base64url').required(),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        CLOUD_NAME: Joi.string().required(),
        API_KEY: Joi.string().required(),
        API_SECRET: Joi.string().required(),
        FOLDER_NAME: Joi.string().default('spmarket_cloudinary').required(),
        MAIL_HOST: Joi.string().default('smtp.gmail.com').required(),
        MAIL_PORT: Joi.number().default(587).required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        SPEAKEASY_SECRET: Joi.string().required(),
        SPEAKEASY_LENGTH: Joi.number().default(6).required(),
        SPEAKEASY_ENCODING: Joi.string().required(),
        SPEAKEASY_ALGORITHM: Joi.string().required(),
        SPEAKEASY_STEP: Joi.number().default(300).required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
        ALGORITHM_AES: Joi.string().required(),
        ALGORITHM_SHA: Joi.string().required(),
        TOKEN_BOT: Joi.string().required()
      }),
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath:
        <string>process.env.NODE_ENV === 'development'
          ? '.env.dev'
          : '.env.prod'
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
