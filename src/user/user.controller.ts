import {Controller, Get, Post, Delete, Query, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PageOptionsDto} from "./dto/page-options.dto";
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return this.userService.paginate(pageOptionsDto);
    }

    @Get("./id")
    getFillOne(id: number) {
        return this.userService.getFillOne(id);
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
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
