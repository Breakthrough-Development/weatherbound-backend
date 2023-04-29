import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsEntity } from './settings.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserEntity } from '../user/user.entity';
import { GetUser } from '../../auth/get-user.decorator';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@GetUser() user: UserEntity) {
    return await this.settingsService.findByUser(user);
  }

  @Post()
  async updateSettings(
    @GetUser() user: UserEntity,
    @Body() settingsData: UpdateSettingsDto,
  ): Promise<SettingsEntity> {
    return await this.settingsService.update(user, settingsData);
  }
}
