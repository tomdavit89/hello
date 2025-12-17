import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/entity.user';
import { PageOptionsDto } from './dto/page-options.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async paginate(pageOptionsDto: PageOptionsDto) {
    return paginate<User>(this.userRepository, {
      page: pageOptionsDto.page,
      limit: pageOptionsDto.limit,
    });
  }

  getFillOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update(id, user);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
