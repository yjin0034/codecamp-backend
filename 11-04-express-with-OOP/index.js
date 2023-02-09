import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// 상품 구매하기
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈 검증하는 코드 (10줄 => 2줄)
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();  // true 또는 false 리턴

  // 2. 판매 여부(판매 처리) 검증하는 코드 (10줄 => 2줄)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();  // true 또는 false 리턴

  // 3. 상품 구매하는 코드
  if(hasMoney && !isSoldout){  // 돈 있고 && 판매 처리된 상품이 아니라면,
    res.send("상품 구매 완료!!");
  }
});

// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부(판매 처리) 검증하는 코드 (10줄 => 2줄)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();  // true 또는 false 리턴

  // 2. 상품 환불하는 코드
  if(isSoldout) {  // 판매 처리된 상품이라면,
    res.send("상품 환불 완료!!");
  }
});

app.listen(3000);