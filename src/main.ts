import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useWebSocketAdapter(new WsAdapter(app, {
        messageParser: (message: string) => {
            const {t, d} = JSON.parse(message.toString());
            return {event: t, data: d}
        }
    }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
