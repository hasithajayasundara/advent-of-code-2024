import fs from "node:fs";

const isSafe = (arr: number[]) => {
  if (arr.length < 2) {
    return true;
  }

  const initDiff = (arr[1] - arr[0]);
  if (initDiff === 0) {
    return false;
  }

  const isIncreasing = initDiff > 0;

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    if (diff === 0) {
      return false;
    }

    if (isIncreasing && diff < 0) {
      return false;
    }
    if (!isIncreasing && diff > 0) {
      return false;
    }

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
  }

  return true;
};

const isSafeByRemovingLevel = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (isSafe(arr.toSpliced(i, 1))) {
      return true;
    }
  }

  return false;
};

try {
  const data = fs.readFileSync('day2.txt', 'utf8');
  let safeCount = 0;
  data.split('\n').filter(Boolean).forEach((line: string) => {
    const levels = line.split(' ').map(Number);
    if (isSafe(levels)) {
      safeCount++;
    } else if (isSafeByRemovingLevel(levels)) {
      safeCount++;
    }
  });

  console.log(safeCount);
} catch (err) {
  console.error(err);
}



