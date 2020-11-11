import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log('puerto:', process.env.PORT)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
