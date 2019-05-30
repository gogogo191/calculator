
let $text = $('#text');
let currentClicked = 'none';
let operand1 = 0;
let operand2 = 0;
let operator = 'none';
let textNoComma = '0'; //콤마를 제거한 숫자
let textInteger = '0';
let textDecimal = ''; //소수 부분
let sequence = 0;
const MAX = 1000000000;

//계산 함수
let calculate = (rator, rand1, rand2) => {
  if (rator === '+') {
    return rand1 + rand2;
  } else if (rator === '-') {
    return rand1 - rand2;
  } else if (rator === 'x') {
    return rand1 * rand2;
  } else if ((rator === '/') && (rand2 !== 0)) {
    return rand1 / rand2;
    // } else if ((rator === '/') && (rand2 === 0)) {
    //   console.log(error);
  } else {
    return rand2;
  }
}

//C버튼 눌렀을 때 
$('#c').on('click', () => {
  textNoComma = '0';
  $text.html(textNoComma);
  operand1 = 0;
  operand2 = 0;
  operator = 'none';
  currentClicked = 'none';
})

//세자리 수마다 콤마찍기
function comma(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}

//정수부 소수부 합치기
const sumOfResult = (integer, decimal) => {
  return integer + '.' + decimal;
}

const updateDisplayValue = value => {
  textNoComma = value;
  if (!textNoComma.includes('.')) {
    $text.html(comma(textNoComma));
  } else {
    $text.html(comma(textInteger) + '.' + cutDecimal(textDecimal));
  }
}

//숫자를 눌렀을 때
$('.number').on('click', (e) => {
  const currentNum = Number(textNoComma);

  if (currentNum >= MAX) {
    return;
  }

  if (currentClicked === 'numClicked' && textNoComma.includes('.') && textDecimal.length < 6) {
    textDecimal += $(e.currentTarget).html();
    updateDisplayValue(sumOfResult(textInteger, textDecimal));
    operand2 = Number(textNoComma);
  } else if (currentClicked === 'numClicked' && textInteger !== '0') {
    textInteger += $(e.currentTarget).html();
    updateDisplayValue(textInteger);
    operand2 = Number(textNoComma);
  } else if (currentClicked !== 'numClicked') {
    textInteger = $(e.currentTarget).html()
    updateDisplayValue(textInteger);
    operand2 = Number(textNoComma);
  }

  currentClicked = 'numClicked';
})

$('.operator').on('click', e => {
  let calResult = 0;
  if ((currentClicked === 'numClicked' && operator !== 'none')) {
    calResult = calculate(operator, operand1, operand2)
    textNoComma = calResult.toString();
    updateDisplayValue(textNoComma);
    operand1 = Number(textNoComma);
    operator = $(e.currentTarget).html();
    currentClicked = 'operClicked';
  } else if (currentClicked === 'operClicked') {
    operator = $(e.currentTarget).html();
  } else if ((currentClicked === 'numClicked' && operator === 'none')) {
    operand1 = Number(textNoComma);
    operator = $(e.currentTarget).html();
    currentClicked = 'operClicked';
  } else if (currentClicked === 'equalClicked') {
    operand1 = Number(textNoComma);
    operator = $(e.currentTarget).html();
    currentClicked = 'operClicked';
  }
})



//등호를 눌렀을 때

//소수점 눌렀을 때

//소수부분 자르기