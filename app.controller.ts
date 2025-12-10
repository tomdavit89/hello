import { Controller, Get, Create, Post, Delete } from "@nestjs/common";
import { createUser } from "./createUser";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get("./id")
  getFillOne(id: number) {
    return this.appService.getFillOne(id);
  }

  @Create()
  createUser(user: createUser) {
    return this.appService.createUser(user);
  }

  @Post("./id")
  updateUser(id: number, user: createUser) {
    return this.appService.updateUser(id, user);
  }

  @Delete("./id")
  deleteUser(id: number) {
    return this.appService.deleteUser(id);
  }
}
