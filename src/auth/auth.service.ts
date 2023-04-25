import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  signJwt(userId: number): string {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }

  verifyJwt(token: string): { userId: number } {
    return this.jwtService.verify<{ userId: number }>(token);
  }

  async validateUser(userId: number) {
    return await this.usersService.findById(userId);
  }
}
