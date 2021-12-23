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
      const listUsers = await this.userModel.findAll();

      return listUsers;
    } catch (error) {
      return error;
    }
  }

  async listOneUser(id: number): Promise<User> {
    try {
      return await this.userModel.findByPk(id);
    } catch (error) {
      return error;
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({
        where: { 
          email: email 
        }
      });
    } catch (error) {
      return error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const userCreated = await this.userModel.create(user);
    
      return userCreated;
    } catch (error) {
      return error;
    }
  }

  async updateUser(idUser: number, user: User) {
    try {
      await this.userModel.update(user, {
        where: {
          id: idUser
        },
        individualHooks: true
      });

      const userUpdate = await this.listOneUser(idUser);

      return userUpdate;
    } catch (error) {
      return error;
    }    
  }

  async deleteUser(id: number) {
    try {
      const userDeleted: User = await this.listOneUser(id);
      
      return await userDeleted.destroy();
    } catch (error) {
      return error;
    }
  }
}