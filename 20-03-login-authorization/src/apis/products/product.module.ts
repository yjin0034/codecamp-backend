import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductTag]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
