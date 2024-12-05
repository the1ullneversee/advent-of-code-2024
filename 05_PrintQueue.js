

const fs = require('fs');
const input = fs.readFileSync('./inputs/05_input.txt', 'utf-8');
let dependencyMap = {}
let updates = []
const lines = input.split('\n');

let lineIdx = 0;
let line = lines[lineIdx];

let dpMapKeys = new Set();
while (line !== "") {
    let parts = line.split('|');
    let num1 = Number(parts[0]);
    let num2 = Number(parts[1]);
    if (dependencyMap[num1] === undefined) {
        dependencyMap[num1] = [];
    }
    dependencyMap[num1].push(num2);

    let key = `${num1}|${num2}`;
    dpMapKeys.add(key);
    lineIdx++;
    line = lines[lineIdx];
}

for (let idx = lineIdx + 1; idx < lines.length; idx++) {
    let nums = lines[idx].split(',')
    nums.forEach((x) => Number(x))
    updates.push(nums.map((x) => Number(x)));

}

console.log(dependencyMap);
console.log(updates);

function doesKeyExist(subKeys, dpMapKeys) {
    for (let key of subKeys) {
        if (dpMapKeys.has(key)) {
            return true;
        }
    }
    return false;
}

let validUpdates = [];
let invalidUpdates = [];
for (let update of updates) {
    console.log(update);
    let updateIsValid = true;
    for (let i = 0; i < update.length; ++i) {
        let currNum = update[i];
        let keys = update.slice(i + 1).map(x => `${x}|${currNum}`);

        let aKeyExists = doesKeyExist(keys, dpMapKeys);
        console.log(`this number ${currNum} is correct pos? ${!aKeyExists}`);
        if (aKeyExists) {
            updateIsValid = false;
            break;
        }
    }
    if(updateIsValid) {
        validUpdates.push(update);
    } else {
        invalidUpdates.push(update);
    }
}

console.log(validUpdates);

let midSum = 0;
for (let update of validUpdates) {
    let mid = Math.floor(update.length / 2);
    midSum += update[mid];
}

for (let update of invalidUpdates) {
    let keysWithCount = [];
    for (let idx = 0; idx < update.length; idx++) {
        let currNum = update[idx];
        for (let k  = 0; k < update.length; k++) {
            if (currNum !== update[k]) {

            }
        }
        let keys = update.slice(idx + 1).map(x => `${currNum}|${x}`);
        console.log(keys);
    }
}
console.log(midSum);