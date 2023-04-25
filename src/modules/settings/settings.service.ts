import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../../entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async findOne(id: number): Promise<Settings> {
    return await this.settingsRepository.findOne({ where: { id } });
  }

  async update(key: string, value: string): Promise<Settings> {
    const setting = await this.settingsRepository.findOne({ where: { key } });
    setting.url = value;
    return await this.settingsRepository.save(setting);
  }
}
