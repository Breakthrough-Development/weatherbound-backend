import { Injectable, Res } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ProfileInterface } from "./model/profile.interface";
import { UsersService } from "./services/users.service";
import { User } from "./entities/user.entity";
import { AuthService } from "./services/auth.service";
import { Response } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService,) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.DOMAIN}:${process.env.PORT}/auth/google/callback`,
      scope: ["email", "profile"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: ProfileInterface, @Res() res: Response) {
    const {
      emails: [{ value: email }],
      displayName: name,
      photos: [{ value: photo }] = [{}]
    } = profile;

    // Check if the user already exists in the database
    const user =  await this.usersService.findUserByEmail(email) || await this.usersService.createUser({
      email,
      name,
      photo
    } as User);

    // Create a JWT token with user ID
    const token = this.authService.signJwt(user.id);

    // Set the JWT token as a cookie in the response
    res.cookie('token', token, {
      maxAge: 86400000, // 24 hours
      httpOnly: true,
      secure: true, // Set this to true in production
      sameSite: 'strict',
    });
  }
}
