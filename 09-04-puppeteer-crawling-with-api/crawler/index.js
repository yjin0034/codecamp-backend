import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Stock } from "./models/stock.model.js";

// 몽고 DB 접속!!
mongoose.connect("mongodb://localhost:27017/mydocker03");

async function startCrawling() {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });  // 열릴 브라우저 크기 설정
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930");  // 해당 주소로 이동함
  
  await new Promise((page) => setTimeout(page, 1000));
  //await page.waitForTimeout(1000);  // 페이지 전부 로딩될 때까지 기다림
  
  // frames들 중에서 찾아주는데, 저 주소를 가지고 있는 iframe을 가져옴
  const framePage = await page
    .frames()
    .find(iframe => iframe.url().includes("/item/sise_day.naver?code=005930"));

  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );
  
    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );
  
    console.log(`날짜: ${date}, 가격: ${price}`);

    const stock = new Stock({
      name: "삼성전자",
      date: date,
      price: Number(price.replace(',', '')),  // 가격의 콤마 제거 후, 숫자로 변환
    });
    await stock.save();
  }

  await browser.close();
}

startCrawling();

