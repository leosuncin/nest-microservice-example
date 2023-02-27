import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Model } from 'mongoose';

import { RegisterUser } from '../dtos/register-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { hashPassword, verifyPassword } from '../utils/crypto';

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

  async login(
    email: string,
    password: string
  ): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return;
    }

    const isPasswordValid = await verifyPassword(user.password, password);

    if (!isPasswordValid) {
      return;
    }

    return user;
  }

  async verifyCredentials<Data extends Pick<User, 'email' | 'password'>>(
    credentials: Data,
    property: keyof Data
  ): Promise<boolean> {
    const query: FilterQuery<UserDocument> = {};

    if ('email' in credentials) {
      query.email = { $eq: credentials.email };
    }

    const user = await this.userModel.findOne(query);

    if (!user) {
      return false;
    }

    if (property !== 'password') {
      return true;
    }

    return verifyPassword(user.password, credentials.password);
  }

  getById(id: User['id']): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
