import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./strategy/google.strategy";
import { User } from "./entities/user.entity";
import { UsersService } from "./services/users.service";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      // todo: JWT_SECRET may be coming in empty
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: "1h" }
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [User],
      synchronize: true
    }),
    PassportModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, UsersService, AuthService]
})
export class AppModule {
}

