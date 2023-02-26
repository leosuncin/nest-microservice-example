import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { User } from '../schemas/user.schema';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(
    _: ExecutionContext,
    next: CallHandler<User>
  ): Observable<{ token: string; user: User }> {
    return next.handle().pipe(
      map((user) => {
        const token = this.generateToken(user);

        return { token, user };
      })
    );
  }

  generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      isAdmin: user.isAdmin,
    });
  }
}
