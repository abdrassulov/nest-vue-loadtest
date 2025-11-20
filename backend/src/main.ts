import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Разрешаем запросы с любого источника (CORS)
  app.enableCors({
    origin: '*', // разрешаем все домены, можно указать конкретный, например 'http://localhost:5173'
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
