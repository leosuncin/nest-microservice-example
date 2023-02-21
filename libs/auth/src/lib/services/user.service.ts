import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { RegisterUser } from '../dtos/register-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { hashPassword } from '../utils/crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(register: RegisterUser): Promise<UserDocument> {
    const user = new this.userModel(register);

    user.password = await hashPassword(register.password);

    return user.save();
  }
}
