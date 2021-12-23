import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";
import { JwtAuthGuard } from "src/auth/shared/jwt-auth.guard";

@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async listOneUser(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      const idUser = params.id
      const user = await this.userService.listOneUser(idUser);
    
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error list user."
        }
      });
    }
  }

  @UseGuards(JwtAuthGuard)
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
          message: "User not found."
        }
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      const idUser = params.id;
      const searchUser: User = await this.userService.listOneUser(idUser);

      if (searchUser) {
        const userDeleted = await this.userService.deleteUser(params.id);

        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          body: {
            message: "User deleted",
            newData: userDeleted
          }
        });
      }

      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "User not found."
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