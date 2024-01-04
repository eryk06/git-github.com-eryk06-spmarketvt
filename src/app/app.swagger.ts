import { NODE_ENV, PORT } from '@/configs';
import { createLogger } from '@/core';
import { UserEntity } from '@/modules';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = createLogger({
  scope: 'Swagger',
  time: NODE_ENV === 'development'
});

export function useSwagger(app: INestApplication) {
  const port = PORT ? +PORT : 4000;
  const path = 'docs';
  const config = new DocumentBuilder()
    .setTitle('NestJS Example')
    .setDescription('NestJS Example Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels
  });
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: (
        a: { get: (arg0: string) => string },
        b: { get: (arg0: string) => string }
      ) => {
        const methodsOrder = [
          'get',
          'post',
          'put',
          'patch',
          'delete',
          'options',
          'trace'
        ];
        let result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));

        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }

        return result;
      }
    }
  });
  logger.log(
    `Your documentation is running on http://localhost:${port}/${path}`
  );
}

const extraModels = [UserEntity];
