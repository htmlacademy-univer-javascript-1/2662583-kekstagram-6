function checkLenStr(str, maxLen){
  return str.length <= maxLen;
}

checkLenStr('Привет', 10);

function isPalindrome(str){
  const normalizeStr = str.replaceAll(' ', '').toUpperCase();
  let reverseStr = '';
  for (let i = normalizeStr.length -1; i >= 0; i-- ){
    const char = normalizeStr[i];
    reverseStr += char;
  }
  return reverseStr === normalizeStr;
}

isPalindrome('Лёша на полке клопа нашёл ');

function extractNumbers(str){
  if (typeof str === 'number') {
    str = str.toString();
  }
  let result = '';
  for(let i = 0; i < str.length; i++){
    const char = str[i];
    const num = parseInt(char, 10);
    if (!Number.isNaN(num)) {
      result += char;
    }
  }
  result = parseInt(result, 10);
  return result;
}

extractNumbers('ECMAScript 2022');
