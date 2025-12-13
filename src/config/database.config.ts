import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {User} from "../user/entity/entity.user";

export const databaseConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT', '3306')),
    username: configService.get<string>('DB_USERNAME', 'root'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [User],
    synchronize: true,
    logging: false,
});
