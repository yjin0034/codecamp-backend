import { CashService } from "./services/cash.service.js";

export class CouponController {
  // 쿠폰(상품권) 구매하기
  buyCoupon = (req, res) => {
    // 1. 가진 돈 검증하는 코드 (10줄 => 2줄)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();  // true 또는 false 리턴
  
    // 2. 쿠폰 구매하는 코드
    if(hasMoney){  // 돈이 있다면,
      res.send("쿠폰 구매 완료!!");
    }
  }
}

