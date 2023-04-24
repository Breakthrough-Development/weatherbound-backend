import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ProfileInterface } from "./model/profile.interface";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.DOMAIN}:${process.env.PORT}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: ProfileInterface) {
    // Implement your validation logic here
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
    };
  }
}
