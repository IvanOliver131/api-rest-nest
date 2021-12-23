import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  @Get()
  async listAllUsers(@Res() res: Response): Promise<Response> {
    try {
      const listUsers = await this.userService.listAllUsers();
    
      return res.status(HttpStatus.OK).json(listUsers);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error listing users."
        }
      });
    }
  }

  @Post()
  async createUser(@Body() user, @Res() res: Response): Promise<Response> {
    try {
      const userCreated = await this.userService.createUser(user); 

      return res.status(HttpStatus.OK).json(userCreated);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error create user."
        }
      });
    }    
  }

  @Put(':id')
  async updateUser(@Param() params, @Body() user: User, @Res() res: Response): Promise<Response> {
    try {
      const idUser = params.id;
      const searchUser: User = await this.userService.listOneUser(idUser);

      if (searchUser) {
        const userUpdated = await this.userService.updateUser(idUser, user);
        
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          body: {
            message: "User updated.",
            newData: userUpdated
          }
        });
      }
  
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error update user."
        }
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error update user."
        }
      });
    }
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      const userDeleted = await this.userService.deleteUser(params.id);

      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        body: {
          message: "User deleted",
          newData: userDeleted
        }
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error delete user."
        }
      });
    }
  }
}