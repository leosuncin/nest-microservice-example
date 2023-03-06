import type { JwtModuleOptions } from '@nestjs/jwt';
import {
  ExtractJwt,
  type StrategyOptions as JwtStrategyOptions,
} from 'passport-jwt';

export type Configuration = ReturnType<typeof loadConfiguration>;

export default function loadConfiguration() {
  return {
    jwt: {
      secret: process.env.SECRET,
    } satisfies JwtModuleOptions,
    jwtStrategy: {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
      passReqToCallback: false,
    } satisfies JwtStrategyOptions,
    port: Number.parseInt(process.env.PORT, 10),
  };
}
