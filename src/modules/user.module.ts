import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from "src/controllers/user.controller";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}