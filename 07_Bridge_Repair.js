const fs = require('fs');
const input = fs.readFileSync('./inputs/07_input.txt', 'utf-8');
const lines = input.split('\n');

let operators = ["*", "+"];

let operations = [];
const operation = {
    sum: 0,
    values: [],
}

class Operation {
    constructor(sum, values) {
        this.sum = sum;
        this.values = values;
    }
}

for (let line of lines) {
    let sum = line.slice(0, line.indexOf(':'));
    let values = line.slice(line.indexOf(':')+2).split(' ').map(x => Number(x));
    operations.push(new Operation(Number(sum), values));
}

function generatePermutations(spaces) {
    const result = [];
    const operators = ["+", "*", "||"];

    function permute(current) {
        if (current.length === spaces) {
            result.push([...current]);
            return;
        }

        for (let op of operators) {
            current.push(op);
            permute(current);
            current.pop();
        }
    }
    permute([]);
    return result;
}

function validCommand(operation, commandChain) {
    let operationValues = operation.values.slice();
    let runningSum = operationValues.shift();
    let currIndex = 1;
    for (let value of operationValues) {
        let currentOperation = commandChain.shift();
        if (currentOperation === '+') {
            runningSum += value;
        }
        if (currentOperation === '*') {
            runningSum *= value;
        }
        if (currentOperation === '||') {
            runningSum = Number(runningSum.toString() + value.toString());
        }
        if (runningSum > operation.sum) {
            break;
        }
    }
    //console.log(`runningSum ${runningSum} target ${operation.sum}`);
    return runningSum === operation.sum;
}


function testOperators(operation) {
    let spaces = operation.values.length -1;
    let permutations = generatePermutations(spaces);
    for (let permutation of permutations) {
        //console.log(`looking at ${permutation}`);
        if (validCommand(operation, permutation)) {
            console.log(`${permutation} is valid for ${operation.values}`);
            return operation.sum;
        }
    }
    return 0;
}

let validOperationsSum = 0;
for (let operation of operations) {
    validOperationsSum += testOperators(operation);
}
console.log(validOperationsSum);

