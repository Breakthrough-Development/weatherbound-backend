import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Profile as ProfileInterface } from 'passport';
import { UserService } from '../../modules/user/user.service';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../modules/user/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    name: string,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const clientId =
      name === 'web'
        ? configService.get<string>('WEB_GOOGLE_CLIENT_ID')
        : configService.get<string>('DESKTOP_GOOGLE_CLIENT_ID');
    const clientSecret =
      name === 'web'
        ? configService.get<string>('DESKTOP_GOOGLE_CLIENT_SECRET')
        : configService.get<string>('DESKTOP_GOOGLE_CLIENT_SECRET');
    super(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: `${configService.get<string>(
          'DOMAIN',
        )}:${configService.get<string>('PORT')}/auth/google/callback`,
        scope: ['email', 'profile'],
        passReqToCallback: true, // Add this line to pass the request object to the callback
      },
      name,
    );
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: ProfileInterface,
    done: (error: any, user?: any, info?: any) => void, // Add the "done" callback parameter
  ) {
    const {
      emails: [{ value: email }],
      displayName: name,
      photos: [{ value: photo } = {} as { value?: string }], // Update the default value here
    } = profile;

    // Check if the user already exists in the database
    const user =
      (await this.usersService.findUserByEmail(email)) ||
      (await this.usersService.create({
        email,
        name,
        photo,
      } as UserEntity));

    // Attach the token to the request object
    req['token'] = this.authService.signJwt(user.id);

    // Call the "done" callback with the user object
    done(null, user);
  }
}
