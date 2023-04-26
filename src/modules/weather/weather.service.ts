import { Injectable } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { UserEntity } from '../user/user.entity';
import { SettingsEntity } from '../settings/settings.entity';

@Injectable()
export class WeatherService {
  constructor(private readonly settingsService: SettingsService) {}

  async getLocationAutocomplete(
    user: UserEntity,
    query: string,
    settings: SettingsEntity,
  ) {
    const url = `${settings.weatherApiUrl}/autocomplete?access_key=${settings.apiKey}&query=${query}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getDailyForecast(
    user: UserEntity,
    query: string,
    settings: SettingsEntity,
  ) {
    const url = `${settings.weatherApiUrl}/forecast?access_key=${settings.apiKey}&query=${query}&forecast_days=1&hourly=1`;
    const response = await axios.get(url);
    return response.data;
  }

  async getWeeklyForecast(
    user: UserEntity,
    query: string,
    settings: SettingsEntity,
  ) {
    const url = `${settings.weatherApiUrl}/forecast?access_key=${settings.apiKey}&query=${query}&forecast_days=7&hourly=24`;
    const response = await axios.get(url);
    return response.data;
  }

  async getCurrentWeather(
    user: UserEntity,
    query: string,
    settings: SettingsEntity,
  ) {
    const url = `${settings.weatherApiUrl}/current?access_key=${settings.apiKey}&query=${query}`;
    const response = await axios.get(url);
    return response.data;
  }
}
