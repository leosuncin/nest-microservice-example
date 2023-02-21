import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Model } from 'mongoose';

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

  async isRegistered(partial: Partial<Pick<User, 'email'>>): Promise<boolean> {
    const where: FilterQuery<UserDocument> = {};

    for (const [property, value] of Object.entries(partial)) {
      if (value) {
        where[property as keyof typeof partial] = { $eq: value };
      }
    }

    const count = await this.userModel.count(where).exec();

    return count >= 1;
  }
}
