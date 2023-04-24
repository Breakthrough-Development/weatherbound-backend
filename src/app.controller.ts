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
    // Handle the Google authentication callback
    res.redirect(process.env.WEB_REDIRECT_URL);
  }
}
