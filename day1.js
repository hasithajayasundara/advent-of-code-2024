const fs = require('fs');

const list1 = [];
const list2 = [];

try {
  const data = fs.readFileSync('day1.txt', 'utf8');
  data.split('\n').forEach((line) => {
    const [n1, n2] = line.split('   ').map(Number);
    if (n1) {
      list1.push(n1);
    }
    if (n2) {
      list2.push(n2);
    }
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  let totalDistance = 0;
  let limit = Math.min(list1.length, list2.length);

  for (let i = 0; i < limit; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }

  const map = new Map();
  for (let i = 0; i < limit; i++) {
    map.set(list2[i], (map.get(list2[i]) ?? 0) + 1);
  }

  let similarityScore = 0;
  for (let i = 0; i < limit; i++) {
    similarityScore += list1[i] * (map.get(list1[i]) ?? 0);
  }


  console.log(totalDistance, similarityScore);
} catch (err) {
  console.error(err);
}



