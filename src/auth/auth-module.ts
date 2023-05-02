import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dotEnv } from '../dot-env';
import { AuthController } from './auth.controller';
import { SettingsModule } from '../modules/settings/settings.module';
import { UserService } from '../modules/user/user.service';
import { WebGoogleStrategy } from './strategy/web-google.strategy';
import { DesktopGoogleStrategy } from './strategy/desktop-google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [dotEnv], isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    SettingsModule,
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'WEB_GOOGLE_STRATEGY',
      useClass: WebGoogleStrategy,
      inject: [UserService, AuthService, ConfigService],
    },
    {
      provide: 'DESKTOP_GOOGLE_STRATEGY',
      useClass: DesktopGoogleStrategy,
      inject: [UserService, AuthService, ConfigService],
    },
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
