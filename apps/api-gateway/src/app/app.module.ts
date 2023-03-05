import { SharedMicroserviceModule } from '@example/shared-microservice';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['APP_SECRET'] ?? 'ツ🔥 丂ㄩ卩乇尺丂乇匚尺乇ㄒ 🔥ツ',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedMicroserviceModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
