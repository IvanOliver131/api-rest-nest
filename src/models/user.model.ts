import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model<User>{

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  username: string;

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
}