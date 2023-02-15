// 타입 추론
let aaa = "안녕하세요";
aaa = 3;

// 타입 명시
let bbb: string = "반갑습니다"
bbb = 10;

// 타입 명시가 필요한 상황
let ccc: string | number = "반갑습니다";
ccc = 10;

// number 타입
let ddd: number = 10;
ddd = "철수";

// boolean 타입
let eee: boolean = true;
eee = false;
eee = "false";  // true로 작동함. boolean 타입을 이렇게 사용하면 안됨.

// array 타입
let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["철수", "영희", "훈이", 3];
let hhh = [1, 2, 3, 4, 5, "잘가요"];
let hhhh: (string | number)[] = [1, 2, 3, 4, 5, "바이"];

// 객체(Object) 타입
interface IProfile {
  name: string
  age: number | string
  school: string
  hobby?: string
}

let profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교"
}

profile.age = "8살";
profile.hobby = "수영";

// 함수(function) 타입
const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
}

const result = add(1000, 2000, "원");