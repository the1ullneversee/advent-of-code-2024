// each row is a report, where each element is a level

// let reports = [
//     [7, 6, 4, 2, 1],
//     [1, 2, 7, 8, 9],
//     [9, 7, 6, 2, 1],
//     [1, 3, 2, 4, 5],
//     [8, 6, 4, 4, 1],
//     [1, 3, 6, 7, 9]
// ]

const fs = require('fs');
const input = fs.readFileSync('02_input.txt', 'utf-8');
const contentLines = input.split('\n');
let reports = []

for (let idx = 0; idx < contentLines.length; idx++) {
    reports.push(contentLines[idx].split(' ').map(Number));
}

// figure out which reports are safe.
// Safe =
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

function checkLevels(levels) {
    console.log(levels);
    const operations = {
        INCREASING: '+',
        DECREASING: '-'
    }
    // is the first greater than the second?
    let previousOperation = null;
    for (let i = 0; i < levels.length -1; i++) {
        let levelDiff = Math.abs(levels[i] - levels[i+1])
        if (levelDiff < 1 || levelDiff > 3) {
            return i+1;
        }
        currentOperation = levels[i] > levels[i + 1] ? operations.DECREASING : operations.INCREASING
        if (!previousOperation) {
            previousOperation = levels[i] > levels[i + 1] ? operations.DECREASING : operations.INCREASING
        } 
        else if (previousOperation != currentOperation) {
            return i+1;
        }
        previousOperation = currentOperation;

    }
    return null;
}

function isLevelSafe(levels) {
    for (let i =0 ; i <2; i++){
        let badElementIdx = checkLevels(levels);
        if (badElementIdx) {
            levels.splice(badElementIdx, 1);
        } else {
            return "Safe";
        }        
    }
    return "Unsafe";
}

let safeReports = 0
for (let i = 0; i < reports.length; i++) {
    if (reports[i].length === 1) {
        continue;
    }
    let isSafe = isLevelSafe(reports[i]);
    console.log(isSafe);
    if (isSafe === "Safe"){
        safeReports += 1;
    }
}
console.log(`There are ${safeReports} safe reports`);
//console.log(reports.forEach((levels) => isLevelSafe(levels)));