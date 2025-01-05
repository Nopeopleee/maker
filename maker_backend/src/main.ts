process.env.TZ = 'Asia/Taipei';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ParseBooleanPipe } from './common/pipes/parse-boolean/parse-boolean.pipe';
import { Request } from 'express';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  // Create the application
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ParseBooleanPipe(),
    new ValidationPipe({ transform: true }),
  );

  // Basic Auth
  app.use(
    ['/v*/docs*'],
    basicAuth({
      users: { admin: process.env.ADMIN_PASSWORD },
      challenge: true,
    }),
  );

  // 首頁跳轉
  app.use((req, res, next) => {
    if (req.url === '/') res.redirect('/v1/docs');
    else next();
  });

  // Swagger
  const options = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME} API`)
    .setDescription(`${process.env.APP_NAME} API 文件`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(':version/docs', app, document, {
    patchDocumentOnRequest(req, _res, document) {
      const copyDocument = JSON.parse(JSON.stringify(document));
      const { version } = (req as Request).params;
      copyDocument.info.version = version;

      // Sort routes
      const sortedPaths = Object.keys(copyDocument.paths).sort();
      const sortedPathsObject = {};
      sortedPaths.forEach((path) => {
        sortedPathsObject[path] = copyDocument.paths[path];
      });
      copyDocument.paths = sortedPathsObject;

      for (const route in document.paths) {
        if (route.startsWith(`/api/${version}`)) {
          continue;
        }
        delete copyDocument.paths[route];
      }

      return copyDocument;
    },
  });

  // Start the application
  let port = Number(process.env.PORT) || 4000;
  while (true) {
    try {
      await app.listen(port);
      let url = await app.getUrl();
      url = url.replace('[::1]', 'localhost');
      console.log(`Application is running on: ${url}`);
      break;
    } catch (error) {
      console.error(`Port ${port} is in use, trying another port...`);
      port++;
    }
  }
}
bootstrap();
