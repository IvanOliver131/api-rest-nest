import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Sequelize, Table } from "sequelize-typescript";
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model<User>{

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  username: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;
 
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  
  name: string;

  @BeforeCreate
  @BeforeUpdate
  static hashPasswordBeforeUpdate(user: User) {
        user.password = bcrypt.hashSync(user.password, 8);
  }
}



