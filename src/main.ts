import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/core/app.module';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { HttpExceptionFilter } from './shared/exceptions/filters/http-exception.filter';
import { BadRequestExceptionFilter } from './shared/exceptions/filters/bad.request.exception.filter';
import { ResourceNotFoundExceptionFilter } from './shared/exceptions/filters/resource.not.found.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config de swagger
  setupSwagger(app);

  // gestion des exceptions
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
    new ResourceNotFoundExceptionFilter(),
  );

  // middleware
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(process.env.PORT || 3000);
}

bootstrap().then(() => true);
