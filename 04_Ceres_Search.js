
const fs = require('fs');
const input = fs.readFileSync('04_input.txt', 'utf-8');
const lines = input.split('\n');
let wordGrid = [];
for (let i = 0; i < lines.length; i++) {
    wordGrid[i] = lines[i];
}
console.log(wordGrid);

function gatherDiagValue(wordGrid, currRow, currCol, direction, targetWordLength) {
    let chunk = "";
    const height = wordGrid.length;
    const width = wordGrid[0].length;

    for (let idx = 0; idx < targetWordLength; idx++) {
        if (direction === "downRight") {
            let rowIndex = currRow + idx;
            let colIndex = currCol + idx;
            if (rowIndex >= height || colIndex >= width) return chunk;
            chunk += wordGrid[rowIndex][colIndex];
        }
        if (direction === "downLeft") {
            let rowIndex = currRow + idx;
            let colIndex = currCol - idx;
            if (rowIndex >= height || colIndex < 0) return chunk;
            chunk += wordGrid[rowIndex][colIndex];
        }
        if (direction === "upRight") {
            let rowIndex = currRow - idx;
            let colIndex = currCol + idx;
            if (rowIndex < 0 || colIndex >= width) return chunk;
            chunk += wordGrid[rowIndex][colIndex];
        }
        if (direction === "upLeft") {
            let rowIndex = currRow - idx;
            let colIndex = currCol - idx;
            if (rowIndex < 0 || colIndex < 0) return chunk;
            chunk += wordGrid[rowIndex][colIndex];
        }
    }
    return chunk;
}

function findXmas(wordGrid) {
    const targetWord = "XMAS";
    let xmasCount = 0;
    // go through each row
    for (let row = 0; row < wordGrid.length; row++) {
        // go through each column
        let word = wordGrid[row];
        let xmasFound = 0;
        let xb = 0;
        let xf = 0;
        let xur = 0;
        let xul = 0;
        let xdl = 0;
        let xdr = 0;
        for (let col = 0; col < word.length; col++) {
            let wordForwards = word.slice(col, col+targetWord.length)
            let wordBackwards = "";
            for (let idx = col; idx > 0 && idx > col - targetWord.length; col--) {
                wordBackwards += word[idx]
            }
            //let wordBackwards = word.slice(col-targetWord.length, col);
            //let wordBackwards = [...word.slice(col-targetWord.length, col)].reverse().join('');
            let wordDownLeftDiag = gatherDiagValue(wordGrid, row, col, "downLeft", targetWord.length);
            let wordDownRightDiag = gatherDiagValue(wordGrid, row, col, "downRight", targetWord.length);
            let wordUpLeftDiag = gatherDiagValue(wordGrid, row, col, "upLeft", targetWord.length);
            let wordUpRightDiag = gatherDiagValue(wordGrid, row, col, "upRight", targetWord.length);
            //console.log(`backwards ${wordBackwards} forwards ${wordForwards} upLeft ${wordUpLeftDiag} upRight ${wordUpRightDiag} downLeft ${wordDownLeftDiag} downRight ${wordDownRightDiag}`);
            if (wordForwards === targetWord) xf++;
            if (wordBackwards === targetWord) xb++;
            if (wordDownRightDiag === targetWord) xdr++;
            if (wordDownLeftDiag === targetWord) xdl++;
            if (wordUpLeftDiag === targetWord) xul++;
            if (wordUpRightDiag === targetWord) xur++;
        }
        console.log(`row ${row+1}  ${wordGrid[row]}`)
        console.log(`found forward ${xf} back ${xb} dr ${xdr} dl ${xdl} ul ${xul} ur ${xur}`);
        xmasCount += xf + xb + xdr + xdl + xdr + xul + xur;
    }

    return xmasCount;
}

console.log(findXmas(wordGrid));