import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from '../modules/user/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SettingsService } from '../modules/settings/settings.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@GetUser() user: User) {
    const settings = await this.settingsService.findByUser(user);
    return { ...user, settings };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res: Response): void {
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
}
