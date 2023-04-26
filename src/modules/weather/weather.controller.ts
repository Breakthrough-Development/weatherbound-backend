import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserEntity } from '../user/user.entity';
import { GetUser } from '../../auth/get-user.decorator';

@Controller('weather')
@UseGuards(JwtAuthGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('autocomplete')
  async getLocationAutocomplete(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    return await this.weatherService.getLocationAutocomplete(user, query);
  }

  @Get('daily')
  async getDailyForecast(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    return await this.weatherService.getDailyForecast(user, query);
  }

  @Get('weekly')
  async getWeeklyForecast(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    return await this.weatherService.getWeeklyForecast(user, query);
  }

  @Get('current')
  async getCurrentWeather(
    @GetUser() user: UserEntity,
    @Query('query') query: string,
  ) {
    console.log('query:', query);
    return await this.weatherService.getCurrentWeather(user, query);
  }
}
