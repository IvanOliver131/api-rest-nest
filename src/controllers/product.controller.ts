import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';

@Controller('produtos')
export class ProductController {
  constructor(private productService: ProductService){}

  @Get()
  listAllProducts(): Product[] {
    const listProducts = this.productService.listAllProducts();

    return listProducts;
  }

  @Get(':id')
  listOneProdutc(@Param() params): Product {
    const listProduct = this.productService.listOneProdutc(params.id); 

    return listProduct;
  }

  @Post()
  createProduct(@Body() product): Product {
    const productCreated = this.productService.createProduct(product); 

    return productCreated;
  }

  @Put(':id')
  updateProduct(@Body() product): Product {
    const productUpdated = this.productService.updateProduct(product); 

    return productUpdated;
  }

  @Delete(':id')
  deleteProduct(@Param() params): Object {
    const productDeleted = this.productService.deleteProduct(params.id);

    return productDeleted;
  }
}
