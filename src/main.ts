import { AppModule } from './app.module';
import { SERVER_CONFIG } from 'configurations/env.config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Metropolitan Museum of Art API')
    .setDescription(
      'Explore the vast collection of artworks from the Metropolitan Museum of Art, spanning 19 departments. Search artworks based on title, department, and other criteria.',
    )
    .setVersion('1.0')
    .addTag('Artworks')
    .addTag('Search')
    .addTag('Departments')
    .build();

  const PORT = SERVER_CONFIG.APP_PORT || 3000;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
