let $text = $("#text");
let currentClicked = null;
let operand1 = 0;
let operand2 = 0;
let operator = null;
let textInteger = "0";
let textDecimal = ""; //소수 부분
let sequence = 0;
const MAX = 1000000000;

//계산 함수
let calculate = (rator, rand1, rand2) => {
  if (rator === "+") {
    return rand1 + rand2;
  } else if (rator === "-") {
    return rand1 - rand2;
  } else if (rator === "x") {
    return rand1 * rand2;
  } else if (rator === "/" && rand2 !== 0) {
    return rand1 / rand2;
  } else if (rator === "/" && rand2 === 0) {
    alert("don't divide with zero");
    return rand1;
  } else {
    return rand2;
  }
};

//C버튼 눌렀을 때
$("#c").on("click", () => {
  textInteger = "0";
  textDecimal = "";
  $text.html("0");
  operand1 = 0;
  operand2 = 0;
  operator = null;
  currentClicked = null;
});

//세자리 수마다 콤마찍기
const comma = num => {
  let str = num.toString();
  const pattern = /(-?\d+)(\d{3})/;

  while (pattern.test(str)) {
    str = str.replace(pattern, "$1,$2");
  }

  return str;
};

//정수부 소수부 합치기
const sumOfResult = (integer, decimal) => {
  if (decimal) {
    return `${integer}.${decimal}`;
  } else {
    return integer;
  }
};

//결과 값 나타내기
const updateDisplayValue = value => {
  if (value.includes(".")) {
    let cuttedValue = cutDecimal(value);
    let toSplit = cuttedValue.split(".");
    textInteger = toSplit[0];
    textDecimal = toSplit[1];
    $text.html(comma(textInteger) + "." + textDecimal);
  } else {
    textInteger = value;
    $text.html(comma(value));
  }
};

//숫자를 눌렀을 때
$(".number").on("click", e => {
  if (Number(textInteger) >= MAX) {
    return;
  }
  if (operand1 < MAX) {
    if (
      currentClicked === "dotClicked" ||
      (currentClicked === "numClicked" &&
        textDecimal.length > 0 &&
        textDecimal.length < 6)
    ) {
      textDecimal += $(e.currentTarget).html();
      updateDisplayValue(sumOfResult(textInteger, textDecimal));
      operand2 = Number(sumOfResult(textInteger, textDecimal));
    } else if (currentClicked === "numClicked" && textInteger !== "0") {
      textInteger += $(e.currentTarget).html();
      updateDisplayValue(textInteger);
      operand2 = Number(textInteger);
    } else {
      textDecimal = "";
      textInteger = $(e.currentTarget).html();
      updateDisplayValue(textInteger);
      operand2 = Number(textInteger);
    }
  }

  currentClicked = "numClicked";
});

//연산을 눌렀을 때

$(".operator").on("click", e => {
  let calResult = 0;

  if (!currentClicked) return;

  switch (currentClicked) {
    case "operClicked":
      operator = $(e.currentTarget).html();
      break;
    case "numClicked":
      if (operand1 < MAX) {
        if (operator) {
          calResult = calculate(operator, operand1, operand2);
          updateDisplayValue(calResult.toString());
          operand1 = calResult;
          operator = $(e.currentTarget).html();
        } else {
          operand1 = Number(sumOfResult(textInteger, textDecimal));
          operator = $(e.currentTarget).html();
        }

        break;
      }
    case "equalClicked":
      if (operand1 < MAX) {
        operand1 = Number(sumOfResult(textInteger, textDecimal));
        operator = $(e.currentTarget).html();
        break;
      }
    default:
      break;
  }

  currentClicked = "operClicked";
});

//등호를 눌렀을 때
$("#equal").on("click", () => {
  if (operand1 < MAX) {
    if (currentClicked === "numClicked") {
      const calResult = calculate(operator, operand1, operand2);
      updateDisplayValue(calResult.toString());
      currentClicked = "equalClicked";
      operand1 = calResult;
      sequence = operand2;
      operand2 = 0;
    } else if (currentClicked === "equalClicked") {
      if (textDecimal !== "00000") {
        const result = calculate(operator, operand1, sequence);
        updateDisplayValue(result.toString());
        operand1 = result;
      }
    }
  }
});

//소수점 눌렀을 때
$("#dot").on("click", () => {
  if (!textDecimal) {
    currentClicked = "dotClicked";
  }
});

//소수 5자리 넘으면 자르기
const cutDecimal = deci => {
  return deci.substring(0, deci.indexOf(".") + 6);
};

//절대값 변경
$("#plusminus").on("click", () => {
  if (textDecimal) {
    operand2 *= -1;
    let calResult = -1 * Number(sumOfResult(textInteger, textDecimal));
    updateDisplayValue(calResult.toString());
  } else {
    operand2 *= -1;
    let calResult = -1 * Number(textInteger);
    updateDisplayValue(calResult.toString());
  }
});
