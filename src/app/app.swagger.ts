import { NODE_ENV, PORT } from '@/configs';
import { createLogger } from '@/core';
import { UserEntity } from '@/modules';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

const logger = createLogger({
  scope: 'Swagger',
  time: NODE_ENV === 'development'
});

export function useSwagger(app: INestApplication) {
  const port = PORT ? +PORT : 4000;
  const path = 'docs';
  const config = new DocumentBuilder()
    .setTitle('Api Shop')
    .setDescription('Api Shop Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer(`http://localhost:${port}/api/v1`)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels
  });
  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
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
  };
  SwaggerModule.setup(path, app, document, options);
  logger.log(
    `Your documentation is running on http://localhost:${port}/${path}`
  );
}

const extraModels = [UserEntity];
