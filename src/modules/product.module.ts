import { Module } from "@nestjs/common";
import { ProductController } from "src/controllers/product.controller";
import { ProductService } from "src/services/product.service";

@Module({
  controllers: [ProductController],
  providers: [
    ProductService
  ]
})
export class ProductModule {}