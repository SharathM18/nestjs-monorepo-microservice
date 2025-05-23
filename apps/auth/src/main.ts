import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const httpApp = await NestFactory.create(AuthModule);

  httpApp.enableCors({
    origin: '*',
    credential: true,
  });

  httpApp.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await httpApp.listen(process.env.PORT!);
  console.log(`Auth service running on HTTP port ${process.env.PORT!}`);
}
bootstrap();
