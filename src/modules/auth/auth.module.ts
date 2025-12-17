import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Auth } from 'src/modules/auth/entity/auth.entity';
import { JwtModuleConfig } from '../../common/config/jwt-config.module';

@Module({
  imports: [JwtModuleConfig, TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
