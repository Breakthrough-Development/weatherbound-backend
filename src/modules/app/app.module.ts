import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../auth/auth-module';
import { JwtService } from '@nestjs/jwt';
import { SettingsModule } from '../settings/settings.module';
import { SettingsEntity } from '../settings/settings.entity';
import { WeatherModule } from '../weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '../../env/validate';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => AppConfig],
      validate: async (config: Record<string, any>) => {
        const appConfig = plainToClass(AppConfig, config);
        const errors = await validate(appConfig);

        if (errors.length > 0) {
          errors.forEach((error) => {
            const errorMessage = {
              value: error.value,
              property: error.property,
              constraints: error.constraints,
              children: error.children,
            };

            console.error(errorMessage);
          });

          throw new Error(
            `Error with the environment variables. Please check the console. Scroll up to see the errors.`,
          );
        }

        return config;
      },
    }),
    WeatherModule,
    SettingsModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UserEntity, SettingsEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, JwtService],
})
export class AppModule {}
