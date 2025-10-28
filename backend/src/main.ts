import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',  // ✅ frontend dev (Vite หรือ Next.js)
      'http://next-frontend:3000', // ✅ frontend ใน Docker
      'http://localhost:3000', // ✅ เผื่อกรณี run local
    ],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ Backend running on port ${port}`);
}
bootstrap();
