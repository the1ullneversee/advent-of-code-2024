
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
        if (direction === "up") {
            let rowIndex = currRow - idx;
            let colIndex = currCol;
            if (rowIndex < 0) return chunk;
            chunk += wordGrid[rowIndex][colIndex];
        }
        if (direction === "down") {
            let rowIndex = currRow + idx;
            let colIndex = currCol;
            if (rowIndex >= height) return chunk;
            chunk += wordGrid[rowIndex][colIndex];
        }
    }
    return chunk;
}

function findXmasPart1(wordGrid) {
    const targetWord = "XMAS";
    let xmasCount = 0;
    const positions = {
        xb: 0,
        xf: 0,
        xur: 0,
        xul: 0,
        xdl: 0,
        xdr: 0,
        wu: 0,
        wd: 0
    };
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
        let wu = 0;
        let wd = 0;
        for (let col = 0; col < word.length; col++) {
            let wordForwards = word.slice(col, col+targetWord.length)
            let wordDown = gatherDiagValue(wordGrid, row, col, "down", targetWord.length);
            let wordUp = gatherDiagValue(wordGrid, row, col, "up", targetWord.length);
            let wordDownLeftDiag = gatherDiagValue(wordGrid, row, col, "downLeft", targetWord.length);
            let wordDownRightDiag = gatherDiagValue(wordGrid, row, col, "downRight", targetWord.length);
            let wordUpLeftDiag = gatherDiagValue(wordGrid, row, col, "upLeft", targetWord.length);
            let wordUpRightDiag = gatherDiagValue(wordGrid, row, col, "upRight", targetWord.length);
            if (wordForwards === targetWord) xf++;
            if (wordForwards === "SAMX") xb++;
            if (wordDownRightDiag === targetWord) xdr++;
            if (wordDownLeftDiag === targetWord) xdl++;
            if (wordUpLeftDiag === targetWord) xul++;
            if (wordUpRightDiag === targetWord) xur++;
            if (wordUp === targetWord) wu++;
            if (wordDown === targetWord) wd++;
        }
        positions['xf'] += xf;
        positions['xur'] += xur;
        positions['xdl'] += xdl;
        positions['xdr'] += xdr;
        positions['xb'] += xb;
        positions['xul'] += xul;
        positions['wu'] += wu;
        positions['wd'] += wd;
        let rowTotal = xf + xb + xdr + xdl + xul + xur + wu + wd;
        xmasCount += rowTotal;
    }
    console.log(positions);

    return xmasCount;
}

function findXmasPart2(wordGrid) {
    const targetWord = "MAS";
    const targetWordBck = "SAM";
    let xmasCount = 0;
    const positions = {
        ur: 0, // up right
        ul: 0, // up left
        dr: 0, // down right
        dl: 0, // down left.
    };
    // go through each row
    for (let row = 0; row < wordGrid.length; row++) {
        let word = wordGrid[row];

        let ur = 0;
        let ul = 0;
        let dl = 0;
        let dr = 0;
        for (let col = 0; col < word.length; col++) {
            // MAS can be found in an X formation, backwards or forwards, so we need to check up left, up right, down right, and down left
            let wordDownLeftDiag = gatherDiagValue(wordGrid, row, col, "downLeft", 2);
            let wordDownRightDiag = gatherDiagValue(wordGrid, row, col, "downRight", 2);
            let wordUpLeftDiag = gatherDiagValue(wordGrid, row, col, "upLeft", 2);
            let wordUpRightDiag = gatherDiagValue(wordGrid, row, col, "upRight", 2);

            if (wordDownLeftDiag) wordDownLeftDiag = wordDownLeftDiag.slice(1);
            if (wordDownRightDiag) wordDownRightDiag = wordDownRightDiag.slice(1);

            let leftX = wordDownRightDiag + wordUpLeftDiag;
            let rightX = wordDownLeftDiag + wordUpRightDiag;

            let leftXFound = leftX === targetWord || leftX === targetWordBck;
            let rightXFound = rightX === targetWord || rightX === targetWordBck;

            if (leftXFound && rightXFound) {
                xmasCount ++;
            }
        }

    }
    return xmasCount;
}

console.log(findXmasPart1(wordGrid));
console.log(findXmasPart2(wordGrid));