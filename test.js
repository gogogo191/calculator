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
let operator = '+';

//계산 함수
let calculate = (rator, rand1, rand2) => {
  if (rator === '+') {
    return rand1 + rand2;
  } else if (rator === '-') {
    return rand1 - rand2;
  } else if (rator === '*') {
    return rand1 * rand2;
  } else if (rator === '/') {
    return rand1 / rand2;
  }
}

//C버튼 눌렀을 때 계산기가 켜집니다
buttons[10].onclick = () => {
  text.innerHTML = '0';
  operand1 = 0;
  operand2 = 0;
  operator = '+';
  currentClicked = 'numclicked';
}

//등호를 눌렀을 때
buttons[16].onclick = () => {
  text.innerHTML = calculate(operator, operand1, operand2).toString();
}

//숫자 눌렀을 때
for (let i = 0; i < 10; i++) {
  buttons[i].onclick = () => {
    if (currentClicked === 'numclicked' && text.innerHTML !== '0') {
      text.innerHTML += buttons[i].innerHTML;
      operand2 = Number(text.innerHTML);

    } else {
      text.innerHTML = buttons[i].innerHTML;
      operand2 = Number(text.innerHTML);
      currentClicked = 'numclicked';
    }
  }
}

//연산 눌렀을 때
buttons[15].onclick = () => {
  text.innerHTML = calculate(operator, operand1, operand2).toString();
  operand2 = 0;
  operand1 = Number(text.innerHTML);
  operator = (buttons[15].innerHTML);
  currentClicked = 'operclicked';
}

