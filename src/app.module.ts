import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./google.strategy";
import { User } from "./user.entity";
import { UsersService } from "./services/users.service";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "database.sqlite",
    entities: [User],
    synchronize: true
  }),
    PassportModule, TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, UsersService]
})
export class AppModule {
}

