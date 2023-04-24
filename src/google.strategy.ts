import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ProfileInterface } from "./model/profile.interface";
import { UsersService } from "./services/users.service";
import { User } from "./user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.DOMAIN}:${process.env.PORT}/auth/google/callback`,
      scope: ["email", "profile"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: ProfileInterface) {
    const {
      emails: [{ value: email }],
      displayName: name,
      photos: [{ value: photo }] = [{}]
    } = profile;

    // Check if the user already exists in the database
    return await this.usersService.findUserByEmail(email) || await this.usersService.createUser({
      email,
      name,
      photo
    } as User);
  }
}
