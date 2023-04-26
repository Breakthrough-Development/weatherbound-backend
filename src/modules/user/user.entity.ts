import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SettingsEntity } from '../settings/settings.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo?: string;

  @OneToOne(() => SettingsEntity, (settings) => settings.user, {
    cascade: true,
  })
  setting: SettingsEntity;
}
