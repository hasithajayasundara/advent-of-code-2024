import fs from "node:fs";

const isCorrect = (items: number[], map: Map<number, Set<number>>): boolean => {
  for (let i = items.length - 1; i >= 0; i--) {
    const curr = items[i];
    if (map.has(curr)) {
      const shouldComeAfter = map.get(curr);
      for (let j = i - 1; j >= 0; j--) {
        if (shouldComeAfter?.has(items[j])) {
          return false;
        }
      }
    }
  }
  return true;
};

const rectify = (items: number[], map: Map<number, Set<number>>) => {
  const correct: number[] = [];
  const temp = [...items]

  while (temp.length > 0) {
    const curr = temp.pop()!;
    const shouldComeAfter = map.get(curr);
    while (
      correct.length > 0
      && shouldComeAfter
      && shouldComeAfter.has(correct[correct.length - 1])
    ) {
      const popped = correct.pop();
      temp.push(popped!);
    }

    correct.push(curr);
  }

  return correct;
};

try {
  const data = fs.readFileSync('day5.txt', 'utf8');
  const list1 = data.split('\n');
  const separatorIdx = list1.indexOf('');
  const order = list1.slice(0, separatorIdx).filter(Boolean).map((o) => o.split('|').map(Number))
  const updates = list1.slice(separatorIdx + 1).filter(Boolean).map((u) => u.split(",").map(Number));

  const map: Map<number, Set<number>> = new Map();
  for (const [parent, child] of order) {
    if (!map.has(parent)) {
      map.set(parent, new Set());
    }
    map.get(parent)!.add(child);
  }

  let sum = 0;
  updates.forEach((item) => {
    if (isCorrect(item, map)) {
      sum += item[Math.floor((item.length / 2))];
    }
  });

  console.log(sum);

  // Part 2
  const incorrectOrders: number[][] = [];
  updates.forEach((item) => {
    if (!isCorrect(item, map)) {
      incorrectOrders.push(item);
    }
  });

  let sum2 = 0;

  incorrectOrders.forEach((item) => {
    const rectified = rectify(item, map);
    sum2 += rectified[Math.floor(rectified.length / 2)]
  });

  console.log(sum2);
} catch (err) {
  console.error(err);
}
