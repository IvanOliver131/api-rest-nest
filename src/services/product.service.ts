import { Injectable } from "@nestjs/common";
import { Product } from "src/models/product.model";

@Injectable()
export class ProductService {
  private products: Array<Product> = [
    new Product({
      id: 1,
      code: "LIV01", 
      name: "teste 1", 
      price: 29.90
    }),
    new Product({
      id: 2,
      code: "LIV02", 
      name: "teste 2", 
      price: 39.90
    }),
    new Product({
      id: 3,
      code: "LIV03", 
      name: "teste 3", 
      price: 49.90
    }),
  ]

  listAllProducts(): Product[]{
    return this.products;
  }

  listOneProdutc(id: number): Product {
    return this.products[id-1];
  }

  createProduct(product: Product): Product {
    this.products.push(product);

    return product;
  }

  updateProduct(product: Product): Product {
    return product;
  }

  deleteProduct(id: number): Object {
    return {
      message: `Product ${id} deleted with succes`
    }
  }
}