import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Settings } from '../settings/settings.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);

    const newSetting = new Settings();
    // Set default values for the settings
    // e.g., newSetting.weatherApiUrl = 'https://api.example.com/weather';
    // newSetting.apiKey = 'your-api-key';

    newUser.setting = await this.settingsRepository.save(newSetting);

    return this.usersRepository.save(newUser);
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
