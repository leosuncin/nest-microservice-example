import type { JwtPayload } from '@example/shared-interfaces';
import { AuthClientService } from '@example/shared-microservice';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

import type { Configuration } from '../../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authClient: AuthClientService,
    config: ConfigService<Configuration, true>
  ) {
    super(config.get('jwtStrategy'));
  }

  validate(payload: JwtPayload) {
    return lastValueFrom(this.authClient.sendGetOneUser(payload.sub));
  }
}
