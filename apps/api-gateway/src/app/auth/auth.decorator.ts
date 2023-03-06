import type { User } from '@example/shared-interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Express {
  export interface Request {
    user?: User | undefined;
  }
}

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Express.Request>().user;
  }
);
