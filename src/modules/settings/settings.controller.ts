import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Req() request): Promise<Settings> {
    const userId = request.user.id;
    return await this.settingsService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':key')
  async update(@Body() setting: Settings): Promise<Settings> {
    return await this.settingsService.update(setting.key, setting.url);
  }
}
