import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Settings } from '../settings/settings.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo?: string;

  @OneToOne(() => Settings, (settings) => settings.user, { cascade: true })
  setting: Settings;
}
