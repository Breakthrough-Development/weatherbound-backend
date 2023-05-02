import { IsEnum } from 'class-validator';

export enum AuthType {
  Web = 'web',
  Desktop = 'desktop',
}

export class AuthTypeDto {
  @IsEnum(AuthType)
  type: AuthType;
}
