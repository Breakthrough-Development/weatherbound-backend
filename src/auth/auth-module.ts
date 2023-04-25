import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dotEnv } from '../dot-env';
import { GoogleStrategy } from './strategy/google.strategy';

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
    UsersModule,
    PassportModule,
  ],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
