import { Column, Table, Model, DataType } from "sequelize-typescript";

@Table
export class Book extends Model<Book> {
  // Já intera o ID
  // id: number;

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  price: number;
}
