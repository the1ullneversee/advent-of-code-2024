const { writeGridToFile, appendGridToFile } = require('./WriterHelper');

const fs = require('fs');
const input = fs.readFileSync('./inputs/06_input.txt', 'utf-8');
let heading = 0;
const directions = {
    '^': 'up',
    '>': 'right',
    '<': 'left',
    'v': 'down'
}
const directionsToHeading = {
    'up': 0,
    'right': 90,
    'down': 180,
    'left': 270,
}
const headingToDirection = {
    0: 'up',
    90: 'right',
    180: 'down',
    270: 'left'
}
const lines = input.split('\n');
let direction = "";
let startingGrid = [];
let startIndex = 0;
for (let row = 0; row < lines.length; row++) {
    let rowElements = lines[row];
    let elements = [];
    let cellIndex = 0;
    for (let char of rowElements) {
        if (char === '.') {elements.push(0);}
        if (char === '#') {elements.push(char);}
        if (char in directions) {
            elements.push(char);
            startIndex = [row, cellIndex];
            direction = directions[char];
            heading = directionsToHeading[direction];
        }
        cellIndex++;
    }
    startingGrid.push(elements);
}
console.log(`starting at ${startIndex} facing ${direction} heading ${heading}*`);


function calculateNewDirection(heading) {
    heading += 90;
    if (heading === 360) heading = 0;
    return [headingToDirection[heading], heading];
}

function setCell(puzzleGrid, row, col) {
    puzzleGrid[row][col] = 1;
}

function _isObstacle(cell) {
    return cell === '#';
}

function crawlPathToObstacle(puzzleGrid, cellPos, direction) {
    const [cellRow, cellCol] = cellPos;
    let height = puzzleGrid[cellRow].length;
    let obstacleFound = false;
    let newPosition = cellPos;

    switch(direction) {
        case 'up':
            for(let row = cellRow; row >= 0; row--) {
                obstacleFound = _isObstacle(puzzleGrid[row][cellCol])
                if (!obstacleFound) {
                    setCell(puzzleGrid, row, cellCol);
                }
                else {
                    newPosition = [row+1, cellCol];
                    break;
                }
            }
            break;
        case 'down':
            for(let row = cellRow; row < height; row++) {
                obstacleFound = _isObstacle(puzzleGrid[row][cellCol])
                if (!obstacleFound) {
                    setCell(puzzleGrid, row, cellCol);
                }
                else {
                    newPosition = [row-1, cellCol];
                    break;
                }
            }
            break;
        case 'left':
            for(let col = cellCol; col >= 0; col--) {
                obstacleFound = _isObstacle(puzzleGrid[cellRow][col])
                if (!obstacleFound) {
                    //grid[cellRow][col] = 1;
                    setCell(puzzleGrid, cellRow, col)
                }
                else {
                    newPosition = [cellRow, col+1];
                    break;
                }
            }
            break;
        case 'right':
            for(let col = cellCol; col < height; col++) {
                obstacleFound = _isObstacle(puzzleGrid[cellRow][col])
                if (!obstacleFound) {
                    setCell(puzzleGrid, cellRow, col);
                }
                else {
                    newPosition = [cellRow, col-1];
                    break;
                }
            }
            break;
    }
    return [obstacleFound, newPosition];
}

function simulateGuardPath(startIndex, direction, heading, puzzleGrid, maxIterations) {
    let position = startIndex;
    let obstacleFound = true;
    let iteration = 0;
    let fileWriteTo = 0;
    while (obstacleFound) {
        iteration++;
        //console.log(`Guard is at [${position}] facing ${direction} heading ${heading}* iteration ${iteration}`);
        let [obstacleFound, newPosition] = crawlPathToObstacle(puzzleGrid, position, direction);
        if (obstacleFound) {
            [direction, heading] = calculateNewDirection(heading);
            position = newPosition;
        } else {
            console.log("Guard escaped");
            break;
        }
        fileWriteTo++
        if (iteration > maxIterations) {
            return null;
        }
    }
    return puzzleGrid;
}
//
const deepCopy = JSON.parse(JSON.stringify(startingGrid))
let solvedGrid = simulateGuardPath(startIndex, direction, heading, deepCopy, 250);

function sumTotalGrid(grid) {
    return grid.map(row =>
        row.reduce((sum, cell) => cell === '#' ? sum : sum + cell, 0)
    ).reduce((total, rowSum) => total + rowSum, 0);
}
writeGridToFile(solvedGrid);
let blockers = 0;
for (let row = 0; row < startingGrid.length; row++) {
    for (let col = 0; col < startingGrid[row].length; col++) {
        const newCopy = JSON.parse(JSON.stringify(startingGrid))
        let cell = newCopy[row][col];
        console.log(`trying to block [${row},${col}] ${newCopy[row][col]}`)
        if (cell === 0 && cell !== '^') {
            newCopy[row][col] = '#';

            solvedGrid = simulateGuardPath(startIndex, direction, heading, newCopy, 250);
            if (solvedGrid === null) {
                blockers += 1;
            } else {
                newCopy[row][col] = 0;
            }
        }
    }
}
console.log(blockers);
