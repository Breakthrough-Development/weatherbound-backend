import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dotEnv } from '../dot-env';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthController } from './auth.controller';
import { SettingsModule } from '../modules/settings/settings.module';

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
  providers: [GoogleStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
