import coolsms from 'coolsms-node-sdk';

export function checkValidationPhone(myphone) {
  // 1. 휴대폰 번호 자릿수 맞는지 확인하기
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log('에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!');
    
    return false;
  } else {

    return true; // 검증 통과
  }
}

export function getToken() {
  // 2. 휴대폰 토큰 6자리 만들기
  const count = 6;

  if (count === undefined) {
    console.log('에러 발생!!! 개수를 제대로 입력해 주세요!!!');
    return;
  } else if (count <= 0) {
    console.log('에러 발생!!! 개수가 너무 적습니다!!!');
    return;
  } else if (count > 10) {
    console.log('에러 발생!!! 개수가 너무 많습니다!!!');
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    '0'
  );

  return result;
  // console.log(result);
}

export async function sendTokenToSMS(myphone, token) {
  // 3. 휴대폰 번호에 토큰 전송하기

  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;
  
  const mysms = coolsms.default; // SDK 가져오기

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  const result = messageService.sendOne({
    to: myphone,
    from: 'SMS_SENDER',
    text: `[코드캠프] 안녕하세요?! 요청하신 인증번호는 [${token}] 입니다.`,
  });

  console.log(result);

  //console.log(myphone + '번호로 인증번호' + token + '를 전송합니다!!!');
}

