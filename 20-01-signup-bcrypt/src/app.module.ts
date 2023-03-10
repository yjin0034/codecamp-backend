import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';
import { ProductModule } from './apis/products/product.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터 베이스 타입
      host: 'localhost', // local 환경으로 진행
      port: 3306, // mysql은 기본 port는 3306
      username: 'root', // mysql은 기본 user는 root로 지정
      password: 'bada332@', // 본인의 mysql password
      database: 'myproject03', // 연결할 데이터 베이스명
      entities: [__dirname + '/apis/**/*.entity.*'], // 데이터 베이스와 연결할 entity
      synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true, // 콘솔 창에 log를 표시할 것인지
    }),
  ],
})
export class AppModule {}
