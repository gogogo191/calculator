let text = document.getElementById('text');
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'C', 'plusminus', 'dividing', 'multiple', 'minus', 'plus', 'equal', 'dot'];
//[0:zero, 1:one, ... 10:c, 11:plusminus...]
const buttons = [];
numbers.forEach(key => {
  buttons.push(document.getElementById(key));
})

let currentClicked = 'none';
let operand1 = 0;
let operand2 = 0;
let operator = 'none';
let textNoComma = '0'; //콤마를 제거한 숫자
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

//C버튼 눌렀을 때 
buttons[10].onclick = () => {
  textNoComma = '0';
  text.innerHTML = '0';
  operand1 = 0;
  operand2 = 0;
  operator = 'none';
  currentClicked = 'numclicked';
}

//등호를 눌렀을 때
buttons[16].onclick = () => {
  if (currentClicked === 'numclicked') {
    textNoComma = calculate(operator, operand1, operand2).toString();
    text.innerHTML = comma(textNoComma);
    currentClicked = 'equalclicked';
    sequence = operand1;
    operand1 = 0;
  } else if (currentClicked === 'equalclicked') {
    operand1 = sequence;
    textNoComma = calculate(operator, operand1, operand2).toString();
    text.innerHTML = comma(textNoComma);
  }
}

//숫자 눌렀을 때
for (let i = 0; i < 10; i++) {
  buttons[i].onclick = () => {
    if (((currentClicked === 'numclicked' && textNoComma !== '0') || (currentClicked === 'dotclicked')) && (textNoComma.length < 11)) {
      textNoComma += buttons[i].innerHTML;
      text.innerHTML = comma(textNoComma);
      operand2 = Number(textNoComma);
      currentClicked = 'numclicked';
    } else if (textNoComma.length < 11) {
      textNoComma = buttons[i].innerHTML;
      text.innerHTML = comma(textNoComma);
      operand2 = Number(textNoComma);
      currentClicked = 'numclicked';
    }
  }
}

//연산 눌렀을 때
for (let i = 12; i < 16; i++) {

  buttons[i].onclick = () => {
    if ((currentClicked === 'numclicked' && operator !== 'none')) {
      textNoComma = calculate(operator, operand1, operand2).toString();
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
    }
  }
}

//소수점 눌렀을 때
buttons[17].onclick = () => {
  if (currentClicked !== 'dotclicked' && !textNoComma.includes('.')) {
    textNoComma += buttons[17].innerHTML;
    text.innerHTML = comma(textNoComma);
    currentClicked = 'dotclicked';
  }
}

//세자리마다 점찍기
const comma = needComma => {
  return Number(needComma).toLocaleString('en');
}

//소수 5자리 제한
const limitDecimal = () => {

}