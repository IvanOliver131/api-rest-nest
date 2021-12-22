export class Product {
  id: number;
  code: string;
  name: string;
  price: number;

  constructor(response: Product) {
    Object.assign(this, response);

    // this.code = code;
    // this.name = name;
    // this.price = price;
  }
}
