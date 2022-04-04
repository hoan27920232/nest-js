import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { HttpErrorFilter } from './shared/http-error-filter';
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(port);
}
bootstrap();
