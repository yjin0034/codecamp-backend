export class ProductController {
  
  constructor(moneyService, productService) {
    this.moneyService = moneyService;
    this.productService = productService;
  }
  
  // 상품 구매하기
  buyProduct = (req, res) => {
    // 1. 가진 돈 검증하는 코드
    //const cashService = new CashService();
    const hasMoney = this.moneyService.checkValue();  // true 또는 false 리턴
  
    // 2. 판매 여부(판매 처리) 검증하는 코드
    //const productService = new ProductService();
    const isSoldout = this.productService.checkSoldout();  // true 또는 false 리턴
  
    // 3. 상품 구매하는 코드
    if(hasMoney && !isSoldout){  // 돈 있고 && 판매 처리된 상품이 아니라면,
      res.send("상품 구매 완료!!");
    }
  };

  // 상품 환불하기
  refundProduct = (req, res) => {
    // 1. 판매 여부(판매 처리) 검증하는 코드
    //const productService = new ProductService();
    const isSoldout = this.productService.checkSoldout();  // true 또는 false 리턴
  
    // 2. 상품 환불하는 코드
    if(isSoldout) {  // 판매 처리된 상품이라면,
      res.send("상품 환불 완료!!");
    }
  };
}