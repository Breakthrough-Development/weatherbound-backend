import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async findByUser(user: User): Promise<Settings> {
    return await this.settingsRepository.findOne({ where: user });
  }

  async update(user: User, settingsData: Partial<Settings>): Promise<Settings> {
    const settings = await this.findByUser(user);
    delete settingsData.id;
    Object.assign(settings, settingsData);
    return await this.settingsRepository.save(settings);
  }
}
