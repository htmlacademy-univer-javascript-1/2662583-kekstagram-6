function lenStr(str, maxLen){
  return str.length <= maxLen;
}

lenStr('Привет', 10);

function isPolindrome(str){
  const normalizeStr = str.replaceAll(' ', '').toUpperCase();
  let reverseStr = '';
  for (let i = normalizeStr.length -1; i >= 0; i-- ){
    const char = normalizeStr[i];
    reverseStr += char;
  }
  return reverseStr === normalizeStr;
}

isPolindrome('Лёша на полке клопа нашёл ');

function numbers(str){
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
  return result === '' ? NaN : parseInt(result, 10);
}

numbers('ECMAScript 2022');

