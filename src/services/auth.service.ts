import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signJwt(userId: number): string {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }

  verifyJwt(token: string): { userId: number } {
    return this.jwtService.verify<{ userId: number }>(token);
  }

}
