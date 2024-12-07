import fs from "node:fs";

const operands = ['+', '*', "||"];

const evaluateExpression = (arr: string[]) => {
  let output = parseInt(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    if (!operands.includes(arr[i])) {
      if (arr[i - 1] === '*') {
        output *= parseInt(arr[i]);
      } else if (arr[i - 1] === '+') {
        output += parseInt(arr[i]);
      } else {
        output = parseInt(`${output}${arr[i]}`);
      }
    }
  }

  return output;
};

try {
  const data = fs.readFileSync('day7.txt', 'utf8');
  let output1 = 0;

  data.split("\n").filter(Boolean).forEach((l) => {
    const values = l.split(":");
    const testValue = values[0]?.trim();
    const operators = values[1].trim().split(" ");

    const check = (currValue: string[] = [], currIdx = 0): boolean => {
      if (currIdx === operators.length) {
        const res = evaluateExpression(currValue);
        if (res === parseInt(testValue)) {
          return true;
        }

        return false;
      }

      let hasConfig = false;

      if (currIdx === operators.length - 1) {
        currValue.push(operators[currIdx]);
        hasConfig ||= check(currValue, currIdx + 1);
        if (hasConfig) {
          return hasConfig;
        }
        currValue.pop();
      } else {
        for (let i = 0; i < operands.length; i++) {
          currValue.push(...[operators[currIdx], operands[i]]);
          hasConfig ||= check(currValue, currIdx + 1);
          if (hasConfig) {
            return hasConfig;
          }
          currValue.pop();
          currValue.pop();
        }
      }

      return hasConfig;
    };

    if (check()) {
      output1 += parseInt(testValue);
    }
  });

  console.log(output1);

} catch (err) {
  console.error(err);
}
