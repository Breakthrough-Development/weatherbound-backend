import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './modules/users/users.service';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth-module';
import { JwtService } from '@nestjs/jwt';
import { SettingsModule } from './modules/settings/settings.module';
import { Settings } from './entities/settings.entity';

@Module({
  imports: [
    SettingsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Settings],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService, JwtService],
})
export class AppModule {}
