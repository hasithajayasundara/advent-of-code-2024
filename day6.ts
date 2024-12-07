import fs from "node:fs";

type Direction = 'U' | 'R' | 'D' | 'L';

const getNextCoordinate = (x: number, y: number, dir: Direction) => {
  switch (dir) {
    case 'U':
      return [x - 1, y];
    case 'R':
      return [x, y + 1];
    case 'D':
      return [x + 1, y];
    case 'L':
      return [x, y - 1];
    default:
      throw new Error('Invalid direction');
  }
};

const getDirectionAfterTurn = (dir: Direction) => {
  switch (dir) {
    case 'U':
      return 'R';
    case 'R':
      return 'D';
    case 'D':
      return 'L';
    case 'L':
      return 'U';
    default:
      throw new Error('Invalid direction for turn');
  }
};

try {
  const data = fs.readFileSync('day6.txt', 'utf8');
  const grid: string[][] = [];
  let initialY = -1;
  let initialX = -1;

  data.split('\n').filter(Boolean).forEach((l, i) => {
    grid[i] = [...l];
    const idx = l.indexOf("^");
    if (idx >= 0) {
      initialY = idx;
      initialX = i;
    }
    i++;
  });

  const rows = grid.length;
  const columns = grid[0].length;

  //const traverse = (x: number, y: number, dir: Direction) => {
  //  if (!visited[x][y]) {
  //    positions++;
  //  }
  //  visited[x][y] = true;

  //  const [nextX, nextY] = getNextCoordinate(x, y, dir);
  //  if (nextX < 0 || nextY < 0 || nextX >= rows || nextY >= columns) {
  //    exited = true;
  //    return;
  //  }

  //  console.log(nextX, nextY);
  //  if (!exited) {
  //    if (grid[nextX][nextY] === '#') {
  //      traverse(x, y, getDirectionAfterTurn(dir));
  //    } else {
  //      traverse(nextX, nextY, dir);
  //    }
  //  }
  //};

  // Part 1
  let currX = initialX;
  let currY = initialY;
  let currDir: Direction = 'U';
  let exited = false;
  let positions = 0;
  const visited = Array
    .from({ length: grid.length })
    .map(() => Array.from({ length: grid[0].length }).fill(false));

  while (true) {
    if (!visited[currX][currY]) {
      positions++;
    }
    visited[currX][currY] = true;

    const [nextX, nextY] = getNextCoordinate(currX, currY, currDir);
    if (nextX < 0 || nextY < 0 || nextX >= rows || nextY >= columns) {
      exited = true;
      break;
    }

    if (!exited) {
      if (grid[nextX][nextY] === '#') {
        currDir = getDirectionAfterTurn(currDir);
      } else {
        currX = nextX;
        currY = nextY;
      }
    } else {
      break;
    }
  }

  console.log(positions);

  // part 2
  const pathCoordinates: Array<[number, number]> = [];
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[i].length; j++) {
      if (visited[i][j]) {
        pathCoordinates.push([i, j]);
      }
    }
  }

  let loopCount = 0;

  pathCoordinates.forEach((item => {
    const gridCopy = grid.map((r) => r.map((c) => c));
    gridCopy[item[0]][item[1]] = '#';
    currX = initialX;
    currY = initialY;
    currDir = 'U';
    exited = false;

    const visitedSetWithDirection: Set<string> = new Set();

    while (true) {
      visitedSetWithDirection.add(`${currX} ${currY} ${currDir}`);
      const [nextX, nextY] = getNextCoordinate(currX, currY, currDir);
      if (nextX < 0 || nextY < 0 || nextX >= rows || nextY >= columns) {
        break;
      }

      if (gridCopy[nextX][nextY] === '#') {
        currDir = getDirectionAfterTurn(currDir);
      } else {
        currX = nextX;
        currY = nextY;
      }

      if (visitedSetWithDirection.has(`${currX} ${currY} ${currDir}`)) {
        loopCount++;
        break;
      }
    }
  }));

  console.log(loopCount);
} catch (err) {
  console.error(err);
}
