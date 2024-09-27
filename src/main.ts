import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './commom/filter/zod.filter';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  const swaggerDocument = yaml.load(fs.readFileSync('api-docs.yaml', 'utf8'));

  SwaggerModule.setup('api', app, swaggerDocument);
  await app.listen(3000);
}
bootstrap();
