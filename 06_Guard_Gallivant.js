const fs = require('fs');
const input = fs.readFileSync('./inputs/06_input.txt', 'utf-8');
const directionChange = 90;
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
let grid = [];
let startIndex = 0;
let columnElements = [];
let columnIndex = 0;
for (let row = 0; row < lines.length; row++) {
    let rowElements = lines[row];
    let elements = [];
    let cellIndex = 0;
    for (let char of rowElements) {
        if (char === '.') {elements.push(0);}
        if (char === '#') {elements.push(char);}
        if (char in directions) {
            startIndex = [row, cellIndex];
            direction = directions[char];
            heading = directionsToHeading[direction];
        }
        cellIndex++;
    }
    grid.push(elements);
}
console.log(grid);
console.log(`starting at ${startIndex} facing ${direction} heading ${heading}*`);

function gatherCorridor(direction, position, grid) {
    let cellRow = position[0];
    let cellCol = position[1];
    let height = grid[cellRow].length;
    let width = grid[cellRow].length;

    let corridor = []
    if (direction === 'up') {
        // need the column values
        for (let row = cellRow; row >= 0; row--) {
            corridor.push(grid[row][cellCol]);
        }
    }
    if (direction === 'down') {
        for (let row = cellRow; row >= height; row++) {
            corridor.push(grid[row][cellCol]);
        }
    }
    return corridor;
}

function calculateNewDirection(heading) {
    heading += 90;
    if (heading === 360) heading = 0;
    return [headingToDirection[heading], heading];
}

function _isObstacle(cell) {
    return cell === '#';
}

function crawlPathToObstacle(grid, cellPos, direction) {
    const [cellRow, cellCol] = cellPos;
    let height = grid[cellRow].length;
    let obstacleFound = false;
    let newPosition = cellPos;

    switch(direction) {
        case 'up':
            for(let row = cellRow; row >= 0; row--) {
                obstacleFound = _isObstacle(grid[row][cellCol])
                if (!obstacleFound) {
                    grid[row][cellCol] = 1;
                }
                else {
                    newPosition = [row+1, cellCol];
                    break;
                }
            }
            break;
        case 'down':
            for(let row = cellRow; row < height; row++) {
                obstacleFound = _isObstacle(grid[row][cellCol])
                if (!obstacleFound) {
                    grid[row][cellCol] = 1;
                }
                else {
                    newPosition = [row-1, cellCol];
                    break;
                }
            }
            break;
        case 'left':
            for(let col = cellCol; col >= 0; col--) {
                obstacleFound = _isObstacle(grid[cellRow][col])
                if (!obstacleFound) {
                    grid[cellRow][col] = 1;
                }
                else {
                    newPosition = [cellRow, col+1];
                    break;
                }
            }
            break;
        case 'right':
            for(let col = cellCol; col < height; col++) {
                obstacleFound = _isObstacle(grid[cellRow][col])
                if (!obstacleFound) {
                    grid[cellRow][col] = 1;
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

function printGrid(grid) {
    grid.forEach(row => {
        console.log(row.map(cell => {
            if (cell === 1) return 'O';
            if (cell === '#') return '#';
            return '.';
        }).join(''));
    });
}

function sleep(ms) {
    const start = Date.now();
    while(Date.now() - start < ms);
}

let position = startIndex;
let obstacleFound = true;
while (obstacleFound) {
    console.log(`Guard is at [${position}] facing ${direction} heading ${heading}*`);
    let [obstacleFound, newPosition] = crawlPathToObstacle(grid, position, direction);
    if (obstacleFound) {
        [direction, heading] = calculateNewDirection(heading);
        position = newPosition;
    } else {
        console.log("Fell off map I guess");
        break;
    }
    process.stdout.write('\x1Bc');
    printGrid(grid);
}

function sumTotalGrid(grid) {
    return grid.map(row =>
        row.reduce((sum, cell) => cell === '#' ? sum : sum + cell, 0)
    ).reduce((total, rowSum) => total + rowSum, 0);
}

let sum = 0;
console.log(sumTotalGrid(grid));

