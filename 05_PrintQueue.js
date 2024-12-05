

const fs = require('fs');
const input = fs.readFileSync('./inputs/05_input.txt', 'utf-8');
let dependencyMap = {}
const lines = input.split('\n');

let lineIdx = 0;
let line = lines[lineIdx];
while (line !== "") {
    let parts = line.split('|');
    if (dependencyMap[parts[0]] === undefined) {
        dependencyMap[parts[0]] = [];
    }
    dependencyMap[parts[0]].push(parts[1]);
    lineIdx++;
    line = lines[lineIdx];
}
