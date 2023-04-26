import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsEntity } from './settings.entity';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity])],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService, TypeOrmModule.forFeature([SettingsEntity])],
})
export class SettingsModule {}
