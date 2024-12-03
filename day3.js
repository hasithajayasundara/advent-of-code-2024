const fs = require('fs');

try {
  const data = fs.readFileSync('day3.txt', 'utf8');

  // Part 1
  const regex = /mul\(\d+,\s*\d+\)/g;
  const matches = data.match(regex);
  let sum = 0;
  matches.forEach(m => {
    const nums = m.match(/\d+/g).map(Number);
    sum += (nums[0] * nums[1]);
  });

  console.log(sum);

  // Part 2
} catch (err) {
  console.error(err);
}
