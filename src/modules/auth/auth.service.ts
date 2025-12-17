import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Auth } from './entity/auth.entity';
import { PayloadRFToken, ResponseAuth } from './interface/login.interface';

@Injectable()
export class AuthService {
  private key = 'users';

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly userRepository: Repository<Auth>,
  ) {}

  async register(dto: RegisterDTO) {
    const { emailTrim, passwordTrim } = this.trimUser(dto.email, dto.password);

    const userRepo = await this.userRepository.findOneBy({ email: emailTrim });
    if (userRepo)
      throw new ConflictException({
        message: 'Email is already',
        error: 'email_conflict',
      });

    const hassPass = await bcrypt.hash(passwordTrim, 10);

    const user = {
      name: dto.name,
      email: emailTrim,
      password: hassPass,
      isVerify: true,
    };

    const newUser = this.userRepository.create(user);
    const createUser = await this.userRepository.save(newUser);

    const { password: _, isVerify: __, isBlock: ___, ...safeUser } = createUser;
    return safeUser;
  }

  async login(dto: LoginDTO, res: Response) {
    const { email, password } = dto;
    const { emailTrim, passwordTrim } = this.trimUser(email, password);

    const userDB = await this.userRepository.findOneBy({ email: emailTrim });
    if (!userDB) throw new NotFoundException('Email is not correct');

    const isMatch = await bcrypt.compare(passwordTrim, userDB.password);
    if (!isMatch) throw new NotFoundException('Password not correct!');

    const payload = {
      userId: userDB.userId,
      email: userDB.email,
      name: userDB.name,
    };

    const accessToken = this.generateAccessToken(payload);
    await this.generateRefreshToken(payload, res);

    const { password: _, isVerify: __, isBlock: ___, ...safeUser } = userDB;

    return {
      message: 'Login success',
      accessToken,
      data: safeUser as ResponseAuth,
    };
  }

  generateAccessToken(payload: {
    email: string;
    userId: string;
    name: string;
  }): string {
    const accessToken = this.jwtService.sign(
      {
        email: payload.email,
        userId: payload.userId,
        name: payload.name,
      },
      { secret: process.env.JWT_ACCESS_TOKEN },
    );
    return accessToken;
  }

  async generateRefreshToken(
    payload: { email: string; userId: string; name?: string },
    res: Response,
  ) {
    const refresToken = this.jwtService.sign(
      { userId: payload.userId, email: payload.email },
      {
        secret: process.env.JWT_REFRESH_TOKEN,
        expiresIn: '7d',
      },
    );

    res.cookie('refreshToken', refresToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  async refreshToken(refreshToken: string) {
    let payload: PayloadRFToken;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });
    } catch {
      throw new UnauthorizedException('Invalid refreshtoken');
    }

    const user = await this.userRepository.findOneBy({
      userId: payload.userId,
    });

    if (!user) throw new NotFoundException('User is not found');

    const newPayload = {
      userId: user.userId,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.generateAccessToken(newPayload);

    const { password: _, isVerify: __, isBlock: ___, ...safeUser } = user;

    return {
      message: 'Login success',
      accessToken,
      data: safeUser,
    };
  }

  async logout(accessToken: string) {
    try {
      await this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN,
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      message: `Logout successfull`,
    };
  }

  private trimUser(email: string, password: string) {
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    return {
      emailTrim,
      passwordTrim,
    };
  }
}
