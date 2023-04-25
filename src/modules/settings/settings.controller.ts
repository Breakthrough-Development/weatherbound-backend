import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { GetUser } from '../../auth/get-user.decorator';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@GetUser() user: User) {
    return await this.settingsService.findByUser(user);
  }

  @Post()
  @HttpCode(204)
  async updateSettings(
    @GetUser() user: User,
    @Body() settingsData: Partial<Settings>,
  ) {
    await this.settingsService.update(user, settingsData);
  }
}
