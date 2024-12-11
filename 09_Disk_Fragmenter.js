const fs = require('fs');
const input = fs.readFileSync('./inputs/09_input.txt', 'utf-8');
const lines = input.split('\n');

function expandSequence(sequence) {
    let currId = 0;
    let outputSequence = [];
    for (let i = 0; i < sequence.length; i++) {
        let blockSize = Number(sequence[i]);
        let freeSpace = Number(sequence[i+1]);
        outputSequence.push(...`${currId}`.repeat(blockSize).split(''));
        outputSequence.push(...`.`.repeat(freeSpace).split(''));
        currId++;
        i+=1;
    }
    return outputSequence;
}

function swapEmptyBlock(sequence, value) {
    let emptyBlockIndex = sequence.indexOf('.');
    if (emptyBlockIndex) {
        sequence[emptyBlockIndex] = value;
    }
}

function compressSequence(sequence) {
    for (let i = sequence.length-1; i > 0; i--) {
        console.log(`checking index ${i} out of ${sequence.length}`);
        let currBlock = sequence[i];
        if (sequence.slice(0, i).indexOf('.') !== -1) {
            swapEmptyBlock(sequence, currBlock);
            sequence[i] = '.'
        } else {
            break;
        }
    }
    return sequence;
}

function computeCheckSum(sequence) {
    let checkSum = 0;
    for (let id = 0; id < sequence.length; id++) {
        if (sequence[id] !== '.') checkSum += id * sequence[id];
    }
    return checkSum;
}
let sequence = expandSequence(lines[0]);
console.log(`expanded sequence: ${JSON.stringify(sequence)}`);
sequence = compressSequence(sequence);
console.log(`compressed sequence: ${JSON.stringify(sequence)}`);
console.log(computeCheckSum(sequence));