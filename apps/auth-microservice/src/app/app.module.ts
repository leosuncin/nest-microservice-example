import { AuthModule } from '@example/auth';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env['MONGO_URL'] ?? 'mongodb://mongo:password@localhost/auth'
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
