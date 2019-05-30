let text = document.getElementById('text');
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'C', 'plusminus', 'dividing', 'multiple', 'minus', 'plus', 'equal', 'dot'];
//[0:zero, 1:one, ... 10:c, 11:plusminus...]
const buttons = [];
numbers.forEach(key => {
  buttons.push(document.getElementById(key));
});

let currentClicked = 'none';
let operand1 = 0;
let operand2 = 0;
let operator = 'none';
let textNoComma = '0'; //콤마를 제거한 숫자
let textInteger = '';
let textDecimal = '0'; //소수 부분
let sequence = 0;

//계산 함수
let calculate = (rator, rand1, rand2) => {
  if (rator === '+') {
    return rand1 + rand2;
  } else if (rator === '-') {
    return rand1 - rand2;
  } else if (rator === 'x') {
    return rand1 * rand2;
  } else if (rator === '/') {
    return rand1 / rand2;
  } else {
    return rand2;
  }
}

const updateDisplayValue = value => {
  textNoComma = value;
  text.innerHTML = comma(value);
}

//C버튼 눌렀을 때 
buttons[10].onclick = () => {
  textNoComma = '0';
  text.innerHTML = '0';
  operand1 = 0;
  operand2 = 0;
  operator = 'none';
  currentClicked = 'none';
}

//등호를 눌렀을 때
buttons[16].onclick = () => {
  if (currentClicked === 'numclicked') {
    const result = calculate(operator, operand1, operand2);
    const cut = limitDecimal(result);

    updateDisplayValue(cut);

    currentClicked = 'equalclicked';
    operand1 = Number(textNoComma);
    sequence = operand2;
    operand2 = 0;
  } else if (currentClicked === 'equalclicked') {
    const result = calculate(operator, operand1, sequence);
    const cut = limitDecimal(result);

    updateDisplayValue(cut);

    operand1 = Number(textNoComma);
  }
}

const MAX = 1000000000;

//숫자 눌렀을 때
for (let i = 0; i < 10; i++) {
  buttons[i].onclick = () => {
    const currentNum = Number(textNoComma);

    if (currentNum >= MAX) {
      return;
    }

    currentClicked = 'numclicked';

    if (textDecimal.includes('.') && textDecimal.length < 6) {
      textDecimal += buttons[i].innerHTML;
      operand2 = Number(textNoComma + textDecimal);
    }
    if (currentClicked === 'numclicked' && textNoComma !== '0') {
      const newValue = textNoComma + buttons[i].innerHTML;

      updateDisplayValue(newValue);

      operand2 = currentNum;
    } else if (currentClicked !== 'numclicked') {
      updateDisplayValue(buttons[i].innerHTML);

      operand2 = currentNum;
    }
  }
}

//연산 눌렀을 때
for (let i = 12; i < 16; i++) {
  buttons[i].onclick = () => {
    if ((currentClicked === 'numclicked' && operator !== 'none')) {
      textNoComma = limitDecimal(calculate(operator, operand1, operand2));
      text.innerHTML = comma(textNoComma);
      operand1 = Number(textNoComma);
      operator = (buttons[i].innerHTML);
      currentClicked = 'operclicked';
    } else if (currentClicked === 'operclicked') {
      operator = buttons[i].innerHTML;
    } else if ((currentClicked === 'numclicked' && operator === 'none')) {
      operand1 = Number(textNoComma);
      operator = buttons[i].innerHTML;
      currentClicked = 'operclicked';
    } else if (currentClicked === 'equalclicked') {
      operand1 = Number(textNoComma);
      operator = buttons[i].innerHTML;
      currentClicked = 'operclicked';
    }
  }
}

//소수점 눌렀을 때
buttons[17].onclick = () => {
  if (currentClicked !== 'dotclicked' && !textNoComma.includes('.')) {
    textDecimal = '.'
    currentClicked = 'dotclicked';
  }
}

//세자리마다 점찍기
const comma = needComma => {
  return Number(needComma).toLocaleString('en');
}

//소수 5자리 제한
const limitDecimal = calResult => {
  return calResult.toFixed(5).toString();
}

//소수부분 자르기
const cutDecimal = textInCal => {
  if (textInCal.includes('.')) {
    let deci = textInCal.split('.');
    return deci[1];
  } else {
    return 0;
  }
}