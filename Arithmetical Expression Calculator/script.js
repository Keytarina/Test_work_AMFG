// Arithmetical Expression Calculator
//
// Простой калькулятор с операторами(*, /, +, -)
// Программа реализована Якубич Катериной


function parsingString(s) {   // Разбираем строку вычисления на массив чисел и операторов

    let calculation = [],     // масив куда мы будем записывать выражение
        current = '';         // текущее число

    for (let i = 0, ch; ch = s.charAt(i); i++) {   //проходимся по каждому символу строки
        if ('*/+-'.indexOf(ch) > -1) {             // если символ равен +, -, * или /
            if (current == '' && ch == '-') {      // если символ равен минусу
                current = '-';                     // добавляем его в переменную текущего числа 
            } else {
                calculation.push(parseFloat(current), ch);    // добавляем в конец масива текущее число и символ
                current = '';                                 // очищаем переменную с текущим число
            }
        } else {                        // если символ не равен +, -, * или /
            current += s.charAt(i);     // добавляем в переменную число
        }
    }
    if (current != '') {                           // проверка на наличие последнего числа
        calculation.push(parseFloat(current));     // добавляем в конец масива текущее число
    }

    return calculation;
}

function calculate(calc) { // Выполняем вычисление, выраженное в виде массива операторов и чисел

    let operations = [                                 // создадим масив с двумя объектами, где запишем свойства операторов  
        {'*': (a, b) => a * b, '/': (a, b) => a / b},
        {'+': (a, b) => a + b, '-': (a, b) => a - b}
    ], newCalc = [], currentOperation;                // создадим масив где будем проводить исчесления, текущеая операция

    for (let i = 0; i < operations.length; i++) {     // проходимся циклом по масиву с операциями (сначала * /, потом + -)
        for (let j = 0; j < calc.length; j++) {       // и по масиву с выражением

            if (operations[i][calc[j]]) {                    // если находим операторы * / + - 
                currentOperation = operations[i][calc[j]];   // записывем свойство в текущую операцию
            } else if (currentOperation) {                   // если текущая операция не пустая 
                newCalc[newCalc.length - 1] =                                // записываем в конец мачива результат арифметической 
                    currentOperation(newCalc[newCalc.length - 1], calc[j]);  // операции между предыдущим и текущим числом 
            } else {                        //если попадаеться число, а текущая операция пустая
                newCalc.push(calc[j]);      //записываем его в масив
            }
        }
        calc = newCalc; // записываем в старый масив результат
        newCalc = [];
    }
    if (calc.length > 1) { //если длинна масива больше 1, невозможно произвести подсчёт
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0]; // возвращаем результат из 0 елемента масива
    }
}

let calculateButton = document.getElementById('calculate'), // записываем в переменные елементы по id  
    userInput = document.getElementById('userInput'),
    result = document.getElementById('result');

calculateButton.addEventListener('click', function() { // ждем событие "клик по кнопке", 
    result.innerHTML = "The answer is " + calculate(parsingString(userInput.value)); // записываем в елемент result ответ (результат работы функций)
});