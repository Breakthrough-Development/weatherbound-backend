import { IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  readonly apiKey: string;

  @IsString()
  readonly weatherApiUrl: string;
}
