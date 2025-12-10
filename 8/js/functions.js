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


function isMeetingInWorkHours(startWork, endWork, startMeeting, duration){
  function toMinutes(timeStr){
    const [hours, minutes] = timeStr.split(':');
    return parseInt(hours, 10)* 60 + parseInt(minutes, 10);
  }

  const startWorkMinutes = toMinutes(startWork);
  const endWorkMinutes = toMinutes(endWork);
  const startMeetingMinutes = toMinutes(startMeeting);

  return startMeetingMinutes + duration <= endWorkMinutes && startMeetingMinutes >= startWorkMinutes;
}


isMeetingInWorkHours('08:00', '17:30', '14:00', 90);

