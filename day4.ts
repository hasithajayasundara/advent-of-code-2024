import fs from "node:fs";

const WORD = 'XMAS';

try {
  const data = fs.readFileSync('day4.txt', 'utf8');
  const arr: string[][] = [];
  data.split('\n').forEach((line) => {
    arr.push([...line]);
  });

  const ROWS = arr.length;
  const COLUMNS = arr[0].length;
  let wordCount = 0;
  let wordCount2 = 0;

  const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  const directions1 = [[-1, 1], [1, -1]];
  const directions2 = [[1, 1], [-1, -1]];

  const dfs = (
    x: number,
    y: number,
    count: number,
    dirX: number,
    dirY: number
  ): boolean => {
    if (count === (WORD.length - 1)) {
      return true;
    }

    if (count > WORD.length) {
      return false;
    }

    let hasOccurrence = false;

    const newX = x + dirX;
    const newY = y + dirY;

    if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLUMNS) {
      const nextChar = WORD.charAt(count + 1);
      if (arr[newX][newY] === nextChar) {
        hasOccurrence ||= dfs(newX, newY, count + 1, dirX, dirY);
      }
    }

    return hasOccurrence;
  };

  // Part 1
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (arr[i][j] === 'X') {
        directions.forEach(([dx, dy]) => {
          if (dfs(i, j, 0, dx, dy)) {
            wordCount++;
          }
        });
      }
    }
  }

  // Part 2
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (arr[i][j] === 'A') {
        let word1 = '';
        let word2 = '';
        for (let k = 0; k < directions1.length; k++) {
          const newX = i + directions1[k][0];
          const newY = j + directions1[k][1];
          if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLUMNS) {
            word1 += arr[newX][newY];
          }
        }

        for (let k = 0; k < directions2.length; k++) {
          const newX = i + directions2[k][0];
          const newY = j + directions2[k][1];
          if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLUMNS) {
            word2 += arr[newX][newY];
          }
        }

        if ((word1 === 'SM' || word1 === 'MS') && (word2 === 'SM' || word2 === 'MS')) {
          wordCount2++;
        }
      }
    }
  }

  console.log(wordCount, wordCount2);
} catch (err) {
  console.error(err);
}
