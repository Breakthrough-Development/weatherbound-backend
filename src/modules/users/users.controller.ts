import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() request): Promise<User | null> {
    const userId = request.user.id;
    return await this.userService.findById(userId);
  }
}
