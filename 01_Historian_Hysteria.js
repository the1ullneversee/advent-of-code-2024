

const fs = require('fs');
const input = fs.readFileSync('01_input.txt', 'utf-8');
const contentLines = input.split('\n');
let idsOne = []
let idsTwo = []

for (let idx = 0; idx < contentLines.length; idx++) {
    let locIds = contentLines[idx].split('   ').map(Number);
    idsOne.push(locIds[0])
    idsTwo.push(locIds[1])
}
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
let leftOccurences = []
let rightOccurences = []

let distance = 0;
for (let i = 0; i < sortedIdsOne.length; i++) {
    if (leftOccurences[sortedIdsOne[i]] === undefined) {
        leftOccurences[sortedIdsOne[i]] = 1
    } else {
        leftOccurences[sortedIdsOne[i]] += 1
    }
    if (rightOccurences[sortedIdsTwo[i]] === undefined) {
        rightOccurences[sortedIdsTwo[i]] = 1;
    }
    else {
        rightOccurences[sortedIdsTwo[i]] += 1;
    }
    distance += Math.abs(sortedIdsOne[i] - sortedIdsTwo[i])
}

let similarities = 0;
for (let idx = 0; idx < leftOccurences.length; idx++) {
    if (leftOccurences[idx] === undefined) {
        continue;
    }
    
    if (rightOccurences[idx] != undefined) {
        // target ID would say be 3, and you add on 3 lot's of each occurence is in left and then * by how many times it appeared in the right
        similarities += (rightOccurences[idx] * idx) * leftOccurences[idx]
    }
}
console.log(similarities)