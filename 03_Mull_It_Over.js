
const fs = require('fs');
let content = fs.readFileSync('03_input.txt', 'utf-8');
console.log(content)

const writeStream = fs.createWriteStream('03_output.txt');

function tryCalcMul(line, operation) {
    let parts = []
    let lineBefore = line;
    let sum = null;
    try {
        // first remove the bracket if it's there
        if (line[0] != "(") {
            return sum;
        }
        parts.push(line[0]);
        line = line.substring(1);
        let [part1, part2] = line.split(",");
        part2 = part2.split(')')[0]
        let num1 = Number(part1);
        let num2 = Number(part2);
        if (isNaN(num1) || isNaN(num2))
        {
            return sum;
        }
        let gap = part1.length + 1 + part2.length;
        parts.push(num1);
        parts.push(num2);
        line = line.slice(gap, gap+1);
        if (line[0] === ")") {
            parts.push(line[0]);
            sum = num1 * num2;
            let gapTaken = 1 + gap + 1;
            let outputStr = `${operation} ${parts[0]}${parts[1]}*${parts[2]}${parts[3]} = ${sum} from ${lineBefore.slice(0, gapTaken)}\n`
            writeStream.write(outputStr);

        }
    }
    catch (error) {
        console.log(error)
    }
    return sum;

}

function detectOnOffOperation(operationEnable, operationDisable, line, index, enabled) {
    let enableChunk = line.slice(index, index + operationEnable.length);
    let disableChunk = line.slice(index, index + operationDisable.length);
    if (enableChunk === operationEnable) {
        console.log(`detected ${enableChunk} setting to enabled`);
        return true;
    }
    if (disableChunk === operationDisable) {
        console.log(`detected ${disableChunk} setting to disabled`);
        return  false;
    }
    return enabled;
}

function detectOperation(line) {
    const operation = "mul";
    let windowSize = operation.length;
    let enabled = true;
    const operationEnable = "do()";
    const operationDisable = "don't()";
    let lineSize = line.length;
    let total = 0;
    for (let i = 0; i < lineSize; i++ ) {
        let chunk = line.slice(i, i + windowSize);
        if (chunk === operation && enabled) {
            let operationStart = i+windowSize
            let sum = tryCalcMul(line.slice(operationStart), chunk);
            if (sum != null) {
                console.log(sum)
                total += sum;
            }
        }
        enabled = detectOnOffOperation(operationEnable, operationDisable, line, i, enabled);
    }
    console.log(`total ${total}`);
}
detectOperation(content);

writeStream.end();