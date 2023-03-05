import type { User } from '@example/shared-interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

declare module 'express' {
  interface Request {
    user: User | undefined;
  }
}

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().user;
  }
);
