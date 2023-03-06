import { ProductSaleslocation } from "src/apis/productSaleslocation/entities/productSaleslocation.entity";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;
}