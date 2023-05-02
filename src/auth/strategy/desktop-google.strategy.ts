import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../modules/user/user.service';
import { AuthService } from '../auth.service';
import { GoogleStrategy } from './google.strategy';

@Injectable()
export class DesktopGoogleStrategy extends GoogleStrategy {
  constructor(
    usersService: UserService,
    authService: AuthService,
    configService: ConfigService,
  ) {
    super(
      'desktop',
      configService.get<string>('DESKTOP_GOOGLE_CLIENT_ID'),
      configService.get<string>('DESKTOP_GOOGLE_CLIENT_SECRET'),
      usersService,
      authService,
      configService,
    );
  }
}
