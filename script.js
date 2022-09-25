const numberButtons = document.querySelectorAll('[data-number]'); //1234...//
const operatorButtons = document.querySelectorAll('[data-operator]'); //+ - * ÷ //
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();// para não aparecer na tela undefined=indefinido, coloca o clear no construstor. //
    }

    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN (integerDigits)) {
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits : 0});
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calcular(){
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand); // convertendo para Float//
        const currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;
        switch (this.Operation){
            case '+':
                result = previousOperandFloat + currentOperandFloat;
            break;
            case '-':
                result = previousOperandFloat - currentOperandFloat;
            break;
            case '*':
                result = previousOperandFloat * currentOperandFloat;
            break;
            case '÷':
                result = previousOperandFloat / currentOperandFloat;
            break;

            default:
                return; 

        }

        this.currentOperand = result;
        this.Operation = undefined;
        this.previousOperand = "";
    }

    choosOperation(operation){
        if(this.currentOperand === '') return;


        if(this.previousOperand != ''){
            this.calcular();
        }
        this.Operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        
    }

    //colocar o número no final. ele vai receber os números//
    appendNumber(number){
        if(this.currentOperand.includes(".") && number=== ".") return; 
        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.Operation = undefined;
    }

    //updateDisplay() MÉTODO para atualizar os textos//
    updateDisplay(){
        this.previousOperandTextElement.innerText = this.formatDisplayNumber(this.previousOperand);
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculadoraReal = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

//receber tos dos números// 
for (const numberButton of numberButtons){
    numberButton.addEventListener("click", () =>{
        calculadoraReal.appendNumber(numberButton.innerText);
        calculadoraReal.updateDisplay();
    })
}

for (const operatorButton of operatorButtons){
    operatorButton.addEventListener("click", () =>{
        calculadoraReal.choosOperation(operatorButton.innerText);
        calculadoraReal.updateDisplay();
    })
}

clearButton.addEventListener("click" , () =>{
    calculadoraReal.clear();
    calculadoraReal.updateDisplay();
})

equalButton.addEventListener("click", () =>{
    calculadoraReal.calcular();
    calculadoraReal.updateDisplay();
})

deleteButton.addEventListener("click", () =>{
    calculadoraReal.delete();
    calculadoraReal.updateDisplay();
});

