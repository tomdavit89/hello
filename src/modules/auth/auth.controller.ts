import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from '../auth/dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.login(dto, res);
  }

  @Post('logout')
  logout(@Req() req: express.Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new UnauthorizedException('Access token is missing or invalid');
    const accessToken = authHeader.split(' ')[1];
    console.log(accessToken);
    return this.authService.logout(accessToken);
  }
}
