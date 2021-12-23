import { Injectable, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ){}

  async listAllUsers(): Promise<User[]> {
    try {
      const listUsers = this.userModel.findAll();

      return listUsers;
    } catch (error) {
      return error;
    }
  }

  async listOneUser(id: number): Promise<User> {
    try {
      return this.userModel.findByPk(id);
    } catch (error) {
      return error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const userCreated = this.userModel.create(user);
    
      return userCreated;
    } catch (error) {
      return error;
    }
  }

  async updateUser(idUser: number, user: User) {
    try {
      this.userModel.update(user, {
        where: {
          id: idUser
        }
      });

      return user;
    } catch (error) {
      return error;
    }    
  }

  async deleteUser(id: number) {
    try {
      const userDeleted: User = await this.listOneUser(id);
      
      return userDeleted.destroy();
    } catch (error) {
      return error;
    }
  }
}