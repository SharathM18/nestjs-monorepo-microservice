import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(process.env.PORT!);
  console.log(`Auth service running on HTTP port ${process.env.PORT!}`);
}
bootstrap();
