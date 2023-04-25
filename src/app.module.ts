import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { AuthService } from './auth/auth.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth-module';
import { JwtService } from '@nestjs/jwt';
import { SettingsModule } from './modules/settings/settings.module';
import { Settings } from './modules/settings/settings.entity';

@Module({
  imports: [
    SettingsModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Settings],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, JwtService],
})
export class AppModule {}
