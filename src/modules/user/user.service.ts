import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SettingsEntity } from '../settings/settings.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(SettingsEntity)
    private settingsRepository: Repository<SettingsEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = this.usersRepository.create(user);
    const newSetting = new SettingsEntity();
    newUser.setting = await this.settingsRepository.save(newSetting);

    return this.usersRepository.save(newUser);
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
