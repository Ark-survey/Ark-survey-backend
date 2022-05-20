import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'; //yarn add -D morgan
import getLogLevels from '../utils/log-utils'
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });
  app.enableCors();
  // app.use(morgan('tiny'))
  app.use(morgan(':method, :url, status :status, length :res[content-length], response in :response-time ms')); //format string
  await app.listen(3333);
}
bootstrap();
