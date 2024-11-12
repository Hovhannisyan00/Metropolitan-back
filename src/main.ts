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
      `
    The Metropolitan Museum of Art Collection API provides access to a vast selection of over 470,000 artworks across 19 departments, such as "Drawings and Prints", "Egyptian Art", "European Paintings", and more. This API allows you to search and explore artworks based on various criteria.
    
    **Features of this project:**
    1. **Department Search**: Allows users to select a department from the museum's collection (e.g., "Ancient Near Eastern Art", "Egyptian Art").
    2. **Artwork Search**: Users can search for artworks by title using keywords.
    3. **Display Artwork Results**: The application will display the first 10 search results with the artwork's title.
    
    **API Endpoints used:**
    1. **Department List**: Fetches the list of departments to help users select the department for search.
    - 'GET /departments — Fetches available departments.'
    2. **Search for Artworks**: Users can search for artworks by title.
    - 'GET /search?q={searchTerm}' — Searches for objects based on the input title.
    3. **Get Artwork Details**: Displays the details of an artwork.
    - GET /objects/{objectID} — Fetches specific details of an artwork using its unique object ID.
    
    Example Test: Search for cylinder in the "Ancient Near Eastern Art" department to explore objects related to this keyword.
    
    Explore artworks, filter by department, and discover more about art pieces from different periods and regions through the API.
    `,
    )
    .setVersion('1.0')
    .addTag('artwork')
    .addTag('search')
    .build();
  const PORT = SERVER_CONFIG.APP_PORT || 3000;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  await app.listen(3000);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
