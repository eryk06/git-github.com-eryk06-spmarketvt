import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NODE_ENV, PORT, SESSION_SECRET } from './configs/environments';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as dayjs from 'dayjs';
import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
import * as flash from 'connect-flash';
import * as morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { middleware as expressCtx } from 'express-ctx';
import helmet from 'helmet';
import logger from './core/utils/logger';
import {
  HttpExceptionFilter,
  ResponseTransformInterceptor,
  TimeoutInterceptor,
  TypeormExceptionFilter,
  ValidationPipe,
} from './core';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { useSwagger } from './app';
import { join } from 'path';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    NODE_ENV !== 'development'
      ? { logger: false }
      : {
          snapshot: true,
          bufferLogs: true,
          forceCloseConnections: true,
        },
  );

  app.setGlobalPrefix('api/v1');

  app.use(express.static(join(__dirname, '..', 'public')));

  const sessionOptions: session.SessionOptions = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  });

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new LoggerErrorInterceptor(),
    new ResponseTransformInterceptor(),
  );

  app.useGlobalFilters(new HttpExceptionFilter(), new TypeormExceptionFilter());

  // middlewares
  app.use(helmet());
  app.enableCors();
  app.use(
    compression({
      filter: () => {
        return true;
      },
      threshold: 0,
    }),
  );
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(cookieParser());
  app.flushLogs();
  app.use(limiter);
  app.use(morgan('dev'));
  app.enableVersioning();
  app.use(expressCtx);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  useSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  return await app.listen(PORT);
}

bootstrap()
  .then(() =>
    logger.success(
      `Application is listening on port ${PORT} | ${NODE_ENV} 🧪 🧴 | ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss 🪼  🦠',
      )}`,
    ),
  )
  .catch((error) => {
    logger.error(`🥵 😡 Server Can Not Start. Error: ${error.message} 😡 🥵`);
  });
