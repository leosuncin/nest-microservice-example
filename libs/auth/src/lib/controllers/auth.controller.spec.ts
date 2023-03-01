import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        UserService,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
