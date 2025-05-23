import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const httpApp = await NestFactory.create(CategoryModule);

  httpApp.enableCors({
    origin: '*',
    credential: true,
  });

  await httpApp.listen(process.env.PORT!);

  console.log(`Category service running on HTTP port ${process.env.PORT!}`);

  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    CategoryModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.CATEGORY_TCP_HOST!,
        port: parseInt(process.env.CATEGORY_TCP_PORT!),
      },
    },
  );

  await tcpApp.listen();
  console.log(
    `Category microservice running on TCP port ${process.env.CATEGORY_TCP_PORT!}`,
  );
}
bootstrap();
