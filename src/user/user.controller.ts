import { Controller, Get,Create, Post, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get("./id")
    getFillOne(id: number) {
        return this.userService.getFillOne(id);
    }

    @Create()
    createUser(user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Post("./id")
    updateUser(id: number, user: UpdateUserDto) {
        return this.userService.updateUser(id, user);
    }

    @Delete("./id")
    deleteUser(id: number) {
        return this.userService.deleteUser(id);
    }
}
