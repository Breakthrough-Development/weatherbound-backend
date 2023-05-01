import { IsString, MinLength } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @MinLength(5)
  readonly apiKey: string;

  @IsString()
  @MinLength(5)
  readonly weatherApiUrl: string;
}
