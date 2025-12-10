import { Injectable } from "@nestjs/common";
import { createUser } from "./createUser";
@Injectable()
export class AppService {
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

  createUser(user: createUser) {
    return this.mang.push(user);
  }

  updateUser(id: number, user: createUser) {
    this.mang.forEach((index) => {
      if (index.id === id) {
        return user;
      }
    });
  }

  deleteUser(id: number) {
    return this.mang.filter((index) => {
      return index.id !== id;
    });
  }
}
