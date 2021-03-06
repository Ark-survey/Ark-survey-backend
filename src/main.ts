import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'; //yarn add -D morgan
import getLogLevels from '../utils/log-utils'

import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
// import { ValidationError, ValidatorOptions } from 'class-validator';

// export interface ValidationPipeOptions extends ValidatorOptions {
//   transform?: boolean;
//   disableErrorMessages?: boolean;
//   exceptionFactory?: (errors: ValidationError[]) => any;
// }
//mongoose 不接受empty string 
//fix方法：https://github.com/Automattic/mongoose/issues/7150
mongoose.Schema.Types.String.checkRequired(v => v != null);

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // app.use(morgan('tiny'))
  app.use(morgan(':method, :url, status :status, length :res[content-length], response in :response-time ms')); //format string
  await app.listen(3333);
}
bootstrap();
