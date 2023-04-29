import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserEntity } from '../user/user.entity';
import { GetUser } from '../../auth/get-user.decorator';
import { SettingsService } from '../settings/settings.service';

@Controller('weather')
@UseGuards(JwtAuthGuard)
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly settingsService: SettingsService,
  ) {}

  @Get('autocomplete')
  async getLocationAutocomplete(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    const settings = await this.settingsService.findByUser(user);
    return await this.weatherService.getLocationAutocomplete(
      user,
      query,
      settings,
    );
  }

  @Get('daily')
  async getDailyForecast(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    const settings = await this.settingsService.findByUser(user);
    return await this.weatherService.getDailyForecast(user, query, settings);
  }

  @Get('weekly')
  async getWeeklyForecast(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    const settings = await this.settingsService.findByUser(user);
    return await this.weatherService.getWeeklyForecast(user, query, settings);
  }

  @Get('current')
  async getCurrentWeather(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    const settings = await this.settingsService.findByUser(user);
    // todo: use guard dto
    // Check if weatherApiUrl and apiKey are strings
    if (
      typeof settings.weatherApiUrl !== 'string' ||
      typeof settings.apiKey !== 'string'
    ) {
      throw new HttpException(
        'Weather API URL and API Key must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.weatherService.getCurrentWeather(user, query, settings);
  }

  @Get('forecast')
  async getForeCast(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    const settings = await this.settingsService.findByUser(user);

    const [current, weekly, daily] = await Promise.all([
      this.weatherService.getCurrentWeather(user, query, settings),
      this.weatherService.getWeeklyForecast(user, query, settings),
      this.weatherService.getDailyForecast(user, query, settings),
    ]);

    return {
      current,
      daily,
      weekly,
    };
  }
}
