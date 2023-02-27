import { userEvents } from '@example/shared-microservice';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UpdateUser } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(userEvents.getOne)
  getOne(@Payload() id: User['id']) {
    return this.userService.getById(id);
  }

  @MessagePattern(userEvents.getAll)
  getAll() {
    return this.userService.getAll();
  }

  @MessagePattern(userEvents.update)
  update(@Payload() update: UpdateUser) {
    return this.userService.updateOne(update.id, update);
  }
}
