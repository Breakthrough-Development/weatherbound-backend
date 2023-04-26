// src/settings/settings.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  apiKey: string;

  @Column({ nullable: true })
  weatherApiUrl: string;

  @OneToOne(() => UserEntity, (user) => user.setting)
  @JoinColumn()
  user: UserEntity;
}
