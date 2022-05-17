import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'; //yarn add -D morgan

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(morgan('tiny'))
  app.use(morgan(':method :url status :res[content-length] -  response in :response-time ms')); //format string
  await app.listen(3333);
}
bootstrap();
