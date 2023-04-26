import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
  ) {}

  async findByUser(user: UserEntity): Promise<SettingsEntity> {
    return await this.settingsRepository.findOne({ where: { user: user } });
  }

  async update(
    user: UserEntity,
    settingsData: Partial<SettingsEntity>,
  ): Promise<SettingsEntity> {
    const settings = await this.findByUser(user);
    delete settingsData.id;
    Object.assign(settings, settingsData);
    return await this.settingsRepository.save(settings);
  }
}
