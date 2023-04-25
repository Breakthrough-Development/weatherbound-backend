// src/settings/settings.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  apiKey: string;

  @Column({ nullable: true })
  weatherApiUrl: string;

  @OneToOne(() => User, (user) => user.setting)
  @JoinColumn()
  user: User;
}
