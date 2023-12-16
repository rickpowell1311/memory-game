import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Memory Game')
    .setDescription('Memory Game Backend APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, {
    yamlDocumentUrl: '/api/swagger-yaml',
    jsonDocumentUrl: '/api/swagger-json'
  });

  await app.listen(3000);
}
bootstrap();
