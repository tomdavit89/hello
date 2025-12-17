import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT', '3307')),
  username: configService.get<string>('DB_USERNAME', 'root'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
});
