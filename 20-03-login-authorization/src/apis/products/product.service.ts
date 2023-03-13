import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from "../productTags/entities/productTag.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>
    ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // const result = await this.productRepository.save({
    //   ...createProductInput, // 스프레드 연산자 사용하기

    //   // 하나하나 직접 나열하는 방식(비효율적, 원본이 바뀌게 됨)
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      // 스프레드 연산자를 사용해서 저장하기
      ...productSaleslocation,
    });

    // productTags // ["#전자제품", "#영등포", "#컴퓨터"]
    const result2 = [] // [{name: ..., id: ...}, {name: ..., id: ...}, {name: ..., id: ...}]

    for(let i=0; i<productTags.length; i++){
      const tagname = productTags[i].replace("#", "")

      // 이미 등록된 태그인지 확인해보기
      const prevTag = await this.productTagRepository.findOne({where: { name: tagname }})

      // 기존에 태그가 존재한다면
      if(prevTag){
        result2.push(prevTag)
      }  
      // 기존에 태그가 없었다면
      else {
        const newTag = await this.productTagRepository.save({ name: tagname })
        result2.push(newTag)
      }
    }

    const result3 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 ( vs id만 넣기)
      productCategory: { id: productCategoryId },
      productTags: result2
    });

    return result3;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductInput, // 스프레드 연산자 사용하기

      // 하나하나 직접 나열하는 방식
      // name: updateProductInput.name,
      // price: updateProductInput.price
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // await this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // await this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // await this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // id뿐만 아니라, 다른 해당 컬럼명을 가지고도 삭제가 가능
    return result.affected ? true : false;
  }
}
