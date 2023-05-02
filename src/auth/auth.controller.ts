import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserEntity } from '../modules/user/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SettingsService } from '../modules/settings/settings.service';
import { GetUser } from './get-user.decorator';
import { GoogleAuthGuard } from './guard/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':type/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {}

  @Get(':type/google/callback') @UseGuards(GoogleAuthGuard) googleAuthRedirect(
    @Req() req,
    @Res() res: Response,
  ): void {
    // Set the JWT token as a cookie in the response
    res.cookie('token', req['token'], {
      maxAge: 86400000, // 24 hours
      httpOnly: true,
      secure: true, // Don't allow JS to capture this token
      sameSite: 'strict',
    });

    // Handle the Google authentication callback
    res.redirect(process.env.WEB_REDIRECT_URL);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@GetUser() user: UserEntity) {
    const settings = await this.settingsService.findByUser(user);
    return { ...user, settings };
  }

  @Get('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.cookie('token', '', {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.send('Logged out successfully');
  }
}
