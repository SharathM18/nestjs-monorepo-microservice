import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const httpApp = await NestFactory.create(UserModule);

  httpApp.enableCors({
    origin: '*',
    credential: true,
  });

  httpApp.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  httpApp.listen(process.env.PORT!);
  console.log(`User service running on HTTP port ${process.env.PORT!}`);

  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USER_TCP_HOST!,
        port: parseInt(process.env.USER_TCP_PORT!),
      },
    },
  );
  tcpApp.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await tcpApp.listen();
  console.log(
    `User microservice running on TCP port ${process.env.USER_TCP_PORT!}`,
  );
}
bootstrap();
