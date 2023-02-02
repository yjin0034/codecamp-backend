import axios from 'axios';


// 비동기 방식
function fetchPost(){
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log(result);  // Promise { <pending> }
}

fetchPost();

// 동기 방식
async function fetchPost2(){
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log(result);  // 실제 데이터
  console.log(result.data); // 실제 데이터
}

fetchPost2();