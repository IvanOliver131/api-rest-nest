export class Book {
  id: number;
  code: string;
  name: string;
  price: number;

  constructor(response: Book) {
    Object.assign(this, response);

    // this.code = code;
    // this.name = name;
    // this.price = price;
  }
}
