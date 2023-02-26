import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { LOCAL_GUARD } from '../constants/guards';
import { UserService } from '../services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_GUARD) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(email: string, password: string) {
    return this.userService.login(email, password);
  }
}
