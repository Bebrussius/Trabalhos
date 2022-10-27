let TotalCorrido = 0;
let buffer = "0";
let OperadorAnterior;

const screen = document.querySelector('.tela');

function buttonClick(value) {
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol){
        case 'C':
            buffer = '0';
            TotalCorrido = 0;
            break;
        case '=':
            if(OperadorAnterior === null){
                return
            }
            flushOperation(parseInt(buffer));
            OperadorAnterior = null;
            buffer = TotalCorrido;
            TotalCorrido = 0;
            break;
        case  '←': 
            if(buffer.length === 1){
                buffer = '0';   
            }else{
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case '+':
        case '−':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
        if(buffer === '0'){
            return;
        }

        const bufferInt = parseInt(buffer);

        if(TotalCorrido === 0){
            TotalCorrido = bufferInt;
        }else{
            flushOperation(bufferInt);
        }
        OperadorAnterior = symbol;
        buffer = '0';

}

function flushOperation(bufferInt) {
    if(OperadorAnterior === '+'){
        TotalCorrido += bufferInt;
    }else if(OperadorAnterior === '−'){
        TotalCorrido -= bufferInt;
    }else if(OperadorAnterior === 'x'){
        OperadorAnterior *= bufferInt;
    }else if(OperadorAnterior === '÷'){
        OperadorAnterior /= bufferInt;
    }
}

function handleNumber(numberString) {
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-botoes').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init()