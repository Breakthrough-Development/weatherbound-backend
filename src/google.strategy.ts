import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Profile as ProfileInterface } from 'passport';
import { UsersService } from "./services/users.service";
import { AuthService } from "./services/auth.service";
import { User } from "./entities/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.DOMAIN}:${process.env.PORT}/auth/google/callback`,
      scope: ['email', 'profile'],
      passReqToCallback: true, // Add this line to pass the request object to the callback
    });
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
      (await this.usersService.createUser({
        email,
        name,
        photo,
      } as User));

    // Create a JWT token with user ID
    const token = this.authService.signJwt(user.id);

    // Attach the token to the request object
    req['token'] = token;

    // Call the "done" callback with the user object
    done(null, user);
  }
}
