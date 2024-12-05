import fs from "node:fs";

const isCorrect = (items: number[], graph: Map<number, Set<number>>): boolean => {
  const visited = new Set<number>();
  for (let i = items.length - 1; i >= 0; i--) {
    const curr = items[i];
    if (graph.has(curr)) {
      const dependencies = graph.get(curr)!;
      for (const dep of visited) {
        if (dependencies.has(dep)) {
          return false;
        }
      }
    }
    visited.add(curr);
  }
  return true;
};

try {
  const data = fs.readFileSync('day5.txt', 'utf8');
  const lines = data.split('\n').filter(Boolean);
  const separatorIdx = lines.indexOf('');
  
  // Parse orders
  const order = lines.slice(0, separatorIdx).map(line => line.split('|').map(Number));
  const updates = lines.slice(separatorIdx + 1).map(line => line.split(',').map(Number));

  // Build graph with Sets for faster lookups
  const graph = new Map<number, Set<number>>();
  for (const [parent, child] of order) {
    if (!graph.has(parent)) {
      graph.set(parent, new Set());
    }
    graph.get(parent)!.add(child);
  }

  // Calculate sum for valid updates
  let sum1 = 0;
  const invalidUpdates: number[][] = [];
  
  for (const item of updates) {
    if (isCorrect(item, graph)) {
      sum1 += item[Math.floor(item.length / 2)];
    } else {
      invalidUpdates.push(item);
    }
  }

  console.log("Sum1:", sum1);

  // Part 2: Correct invalid orders and calculate sum
  let sum2 = 0;

  for (const item of invalidUpdates) {
    const stack: number[] = [];
    const correctOrder: number[] = [];

    while (item.length > 0) {
      const curr = item.pop()!;
      const dependencies = graph.get(curr);
      
      while (
        correctOrder.length > 0 &&
        dependencies &&
        dependencies.has(correctOrder[correctOrder.length - 1])
      ) {
        stack.push(correctOrder.pop()!);
      }

      correctOrder.push(curr);
      while (stack.length > 0) {
        item.push(stack.pop()!);
      }
    }

    sum2 += correctOrder[Math.floor(correctOrder.length / 2)];
  }

  console.log("Sum2:", sum2);
} catch (err) {
  console.error("Error:", err);
}
