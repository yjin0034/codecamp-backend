import { getToday } from "./utils.js";
import nodemailer from 'nodemailer';
import 'dotenv/config';

export function checkValidationEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  const mytemplate = `
    <html>
      <body>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 500px;">
            <h1 style="color: red">${name}님 가입을 환영합니다!!!</h1>
            <hr />
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
            <div>가입일: ${getToday()}</div>
          </div>
        </div>
      </body>
    </html>
    `;

    // console.log(mytemplate);
    return mytemplate;
}

export async function sendTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[코드캠프] 가입을 축하합니다!!!",
    html: mytemplate
  })

  console.log(result);

  //console.log(myemail + "이메일로 가입환영 템플릿 " + result + "를 전송합니다.");
}