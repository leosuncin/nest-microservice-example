import type { JwtPayload } from '@example/shared-interfaces';
import { AuthClientService } from '@example/shared-microservice';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authClient: AuthClientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['SECRET'] ?? 'ツ🔥 丂ㄩ卩乇尺丂乇匚尺乇ㄒ 🔥ツ',
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload) {
    return lastValueFrom(this.authClient.sendGetOneUser(payload.sub));
  }
}
