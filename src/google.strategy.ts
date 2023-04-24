import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

// todo: Replace your-client-id and your-client-secret with your Google OAuth client ID and secret. This sets up the Google authentication strategy using the passport-google-oauth20 module. It also defines the validate method, which is called after the user is authenticated.
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Implement your validation logic here
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
    };
  }
}
