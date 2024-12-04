
let idsOne = []
let idsTwo = []

const fs = require('fs');

const input = fs.readFileSync('advent-of-code/01_input.txt', 'utf-8')
const contentLines = input.split('\n');

for (let idx = 0; idx < contentLines.length; idx++) {
    let items = contentLines[idx].trim().split(/\s+/).map(Number);
    idsOne.push(items[0])
    idsTwo.push(items[1])
}
console.log(idsOne)
console.log(idsTwo)

function insertionSort(ids) {
    for (let i = 1; i < ids.length; i++) {
        key = ids[i];
        j = i - 1;
        while (j >= 0 && ids[j] > key) {
            ids[j + 1] = ids[j];
            j -= 1;
        }
        ids[j + 1] = key;
    }
    return ids
}

let sortedIdsOne = insertionSort(idsOne);
let sortedIdsTwo = insertionSort(idsTwo);

let distance = 0;
for (let i = 0; i < sortedIdsOne.length; i++) {
    distance += Math.abs(sortedIdsOne[i] - sortedIdsTwo[i])
}
console.log(distance)
