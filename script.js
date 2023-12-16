// values or something idk
let boxCountInput, dropChanceInput, dropCountInput;
let output;

function setup() {
    boxCountInput = document.getElementById("box-count");
    dropChanceInput = document.getElementById("drop-chance");
    dropCountInput = document.getElementById("drop-count");
    output = document.getElementById("output-message")
}

function onLoad() {
    setup();
}

function generateResult() {
    let boxCount = parseInt(boxCountInput.value);
    let dropChance = dropChanceInput.value;
    let dropCount = parseInt(dropCountInput.value);

    if (isNaN(boxCount)) {
        boxCount = 0;
    }

    let splitChance = dropChance.split("/") 
    if (splitChance.length == 2) {
        let top = parseInt(splitChance[0]);
        let bot = parseInt(splitChance[1]);
        let value = (top / bot);
        if (!isNaN(value) && isFinite(value)) {
            dropChance = value;
        } else {
            dropChance = 0;
        }
    } else {
        dropChance = parseFloat(dropChance) / 100;
        if (isNaN(dropChance)) {
            dropChance = 0;
        }
    }

    if (isNaN(dropCount)) {
        dropCount = 0;
    }

    let failRate = 1 - dropChance;
    let thatJustHappened = Math.pow(failRate, boxCount - dropCount) * Math.pow(dropChance, dropCount) * combinations(boxCount, dropCount);
    
    
    let outputString = "";
    outputString += "You opened ";
    outputString += boxCount;
    outputString += " boxes and obtained ";
    outputString += dropCount;
    outputString += " items with a drop rate of ";
    outputString += percentageString(dropChance * 100);
    outputString += "%. The chance of this happening was ";
    outputString += percentageString(thatJustHappened * 100);
    outputString += "%.";

    output.textContent = outputString;
}

function factorial(n) {
    if (n == 1 || n == 0) {
        return 1;
    } else if (n < 0) {
        return 0;
    } else {
        return n * factorial(n-1);
    }
}

function combinations(n, m) {
    return (factorial(n) / (factorial(m) * factorial(n - m)));
}

function percentageString(num) {
    if (num < 1e-6) {
        return "0.00";
    }
    let outputString = num + "";
    let decimalPos = outputString.indexOf(".");
    if (decimalPos != -1) {
        outputString = outputString.substring(0, decimalPos + 6);
    }
    return outputString;
}