import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_GUARD } from '../constants/guards';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_GUARD) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['SECRET'],
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
