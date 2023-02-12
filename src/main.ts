import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT;

  app.setGlobalPrefix('doginapi');
  
  const config = new DocumentBuilder()
    .setTitle('Dogin API - Documentación')
    .setDescription('endpoints Dogín')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doginapi', app, document);
  
  await app.listen(port);
  logger.verbose(`Aplicación iniciada en el puerto ${port}`);



}
bootstrap();
