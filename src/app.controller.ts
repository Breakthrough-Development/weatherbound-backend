import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("auth/google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
  }

  @Get("auth/google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req, @Res() res: Response): void {
    // Set the JWT token as a cookie in the response
    res.cookie('token', req['token'], {
      maxAge: 86400000, // 24 hours
      httpOnly: true,
      secure: true, // Set this to true in production
      sameSite: 'strict',
    });

    // Handle the Google authentication callback
    res.redirect(process.env.WEB_REDIRECT_URL);
  }
}
