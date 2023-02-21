import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { IsNotRegisterConstraint } from './validators/is-not-register.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, IsNotRegisterConstraint],
  exports: [],
})
export class AuthModule {}
