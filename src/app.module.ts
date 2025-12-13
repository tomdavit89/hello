import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StockGateway } from './stock/stock.gateway';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./config/database.config";


@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
      }),

      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: databaseConfig,
      }),

      UserModule],
  controllers: [AppController],
  providers: [AppService,StockGateway],
})
export class AppModule {}
