import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const httpApp = await NestFactory.create(ProductModule);

  httpApp.enableCors({
    origin: '*',
    credential: true,
  });

  httpApp.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await httpApp.listen(process.env.PORT!);

  console.log(`Product service running on HTTP port ${process.env.PORT!}`);
}
bootstrap();
