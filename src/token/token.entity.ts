import { Column, Table, Model, DataType  } from "sequelize-typescript";

@Table
export class Token extends Model<Token>{
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hash: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: string;
}