import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "database.sqlite",
    entities: [],
    synchronize: true
  }),
    PassportModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy]
})
export class AppModule {
}

