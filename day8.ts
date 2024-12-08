import fs from "node:fs";

const isAlphaNumeric = (s: string) => /^[a-zA-Z0-9]$/.test(s);
const distanceBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => (
  Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
);

const isOnSameLine = (dX: number, dY: number, x1: number, y1: number, x: number, y: number) => {
  return (dX * (y - y1)) === (dY * (x - x1));
};

const getPoint = (
  x: number,
  y: number,
  dX: number,
  dY: number,
  dir: 'UL' | 'UR' | 'LL' | 'LR',
  ulX: number,
  ulY: number,
  tD: number,
) => {
  if (dir === 'UL') {
    for (let i = x - 1; i >= 0; i--) {
      for (let j = y - 1; j >= 0; j--) {
        if (isOnSameLine(dX, dY, x, y, i, j)) {
          const d = distanceBetweenPoints(i, j, x, y);
          if (d === tD) {
            return [i, j];
          }
        }
      }
    }
  } else if (dir === 'UR') {
    for (let i = x - 1; i >= 0; i--) {
      for (let j = y + 1; j < ulY; j++) {
        if (isOnSameLine(dX, dY, x, y, i, j)) {
          const d = distanceBetweenPoints(i, j, x, y);
          if (d === tD) {
            return [i, j];
          }
        }
      }
    }
  } else if (dir === 'LL') {
    for (let i = x + 1; i <= ulX; i++) {
      for (let j = y - 1; j >= 0; j--) {
        if (isOnSameLine(dX, dY, x, y, i, j)) {
          const d = distanceBetweenPoints(i, j, x, y);
          if (d === tD) {
            return [i, j];
          }
        }
      }
    }
  } else if (dir === 'LR') {
    for (let i = x + 1; i < ulX; i++) {
      for (let j = y + 1; j < ulY; j++) {
        if (isOnSameLine(dX, dY, x, y, i, j)) {
          const d = distanceBetweenPoints(i, j, x, y);
          if (d === tD) {
            return [i, j];
          }
        }
      }
    }
  }

  return null;
};


try {
  const data = fs.readFileSync("day8.txt", "utf-8");
  const grid = data.split("\n").filter(Boolean).map((line) => [...line])
  //const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

  const rows = grid.length;
  const columns = grid[0].length;

  const map = new Map();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (isAlphaNumeric(grid[i][j])) {
        if (map.has(grid[i][j])) {
          map.get(grid[i][j]).push([i, j]);
        } else {
          map.set(grid[i][j], [[i, j]]);
        }
      }
    }
  }

  console.log('rows', rows, "columns", columns, map);

  const set = new Set();

  map.forEach((points) => {
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[j];
        const d = distanceBetweenPoints(p[0], p[1], p1[0], p1[1]);
        const dX = p[0] - p1[0];
        const dY = p[1] - p1[1];
        const dirRes1 = dY > 0 ? 'UR' : 'UL';
        const dirRes2 = dY > 0 ? 'LL' : 'LR';
        const res1 = getPoint(p[0], p[1], dX, dY, dirRes1, rows, columns, d);
        const res2 = getPoint(p1[0], p1[1], dX, dY, dirRes2, rows, columns, d);
        if (res1) {
          set.add(`${res1[0]} ${res1[1]}`);
        }
        if (res2) {
          set.add(`${res2[0]} ${res2[1]}`);
        }
      }
    }
  });

  console.log(set);
} catch (err) {
  console.error(err);
}

// 6 2
