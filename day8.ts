import fs from "node:fs";

const isAlphaNumeric = (s: string) => /^[a-zA-Z0-9]$/.test(s);
const distanceBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => (
  Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
);

const isOnSameLine = (dX: number, dY: number, x1: number, y1: number, x: number, y: number) => {
  return (dX * (y - y1)) === (dY * (x - x1));
};

// part for point generation
// deno-lint-ignore no-unused-vars
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
    for (let i = x + 1; i < ulX; i++) {
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

// part 2 point gen
const getPoint2 = (
  x: number,
  y: number,
  dX: number,
  dY: number,
  ulX: number,
  ulY: number,
) => {
  const positions = [];
  for (let i = 0; i < ulX; i++) {
    for (let j = 0; j < ulY; j++) {
      if (isOnSameLine(dX, dY, x, y, i, j)) {
        positions.push([i, j]);
      }
    }
  }

  return positions;
};


try {
  const data = fs.readFileSync("day8.txt", "utf-8");
  const grid = data.split("\n").filter(Boolean).map((line) => [...line]);
  const copy = grid.map((l) => [...l]);

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

  map.forEach((points) => {
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[j];
        const dX = p[0] - p1[0];
        const dY = p[1] - p1[1];

        //const dirRes1 = dY > 0 ? 'UR' : 'UL';
        //const dirRes2 = dY > 0 ? 'LL' : 'LR';

        const res1 = getPoint2(p[0], p[1], dX, dY, rows, columns);
        const res2 = getPoint2(p1[0], p1[1], dX, dY, rows, columns);
        res1.forEach(pn => {
          copy[pn[0]][pn[1]] = "#";
        });

        res2.forEach(pn => {
          copy[pn[0]][pn[1]] = "#";
        });

        if (res1.length || res2.length) {
          copy[p[0]][p[1]] = "#";
          copy[p1[0]][p1[1]] = "#";
        }
      }
    }
  });

  console.log(copy.reduce((acc, curr) => acc + curr.filter((i) => (i === "#")).length, 0));
} catch (err) {
  console.error(err);
}
