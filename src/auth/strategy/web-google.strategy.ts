import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../modules/user/user.service';
import { AuthService } from '../auth.service';
import { GoogleStrategy } from './google.strategy';

@Injectable()
export class WebGoogleStrategy extends GoogleStrategy {
  constructor(
    usersService: UserService,
    authService: AuthService,
    configService: ConfigService,
  ) {
    super(
      'web',
      configService.get<string>('WEB_GOOGLE_CLIENT_ID'),
      configService.get<string>('WEB_GOOGLE_CLIENT_SECRET'),
      usersService,
      authService,
      configService,
    );
  }
}
