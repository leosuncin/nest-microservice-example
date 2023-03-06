import { SharedMicroserviceModule } from '@example/shared-microservice';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import loadConfiguration from '../config/configuration';
import validationSchema from '../config/validation-schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [loadConfiguration],
      validationSchema,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (
        config: ConfigService<ReturnType<typeof loadConfiguration>>
      ) => config.get('jwt'),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedMicroserviceModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
