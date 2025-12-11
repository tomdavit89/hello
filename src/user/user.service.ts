import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import{ Paging} from "./common/common.pagelimit";

@Injectable()
export class UserService {
    private mang = [
        {
            id: 1,
            name: "John Doe",
            age: 28,
            gender: "male",
        },
        {
            id: 2,
            name: "John",
            age: 28,
            gender: "Male",
        },
        {
            id: 3,
            name: "John",
            age: 28,
            gender: "Male",
        },
    ];

    getAll() {
        return this.mang;
    }

    getFillOne(id: number) {
        this.mang.forEach((index) => {
            if (index.id === id) {
                return index;
            }
        });
    }

    createUser(user: CreateUserDto) {
        return this.mang.push(user);
    }

    updateUser(id: number, user: UpdateUserDto) {
        this.mang.forEach((index:{id: number, name: string, age: number, gender: string}) => {
            if (index.id === id) {
                return this.mang[this.mang.indexOf(index)] = user;
            }
        });
    }

    deleteUser(id: number) {
        return this.mang.filter((index) => {
            return index.id !== id;
        });
    }
}