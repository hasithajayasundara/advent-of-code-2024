import fs from "node:fs";

try {
  const data = fs.readFileSync('day3.txt', 'utf8');

  // Part 1
  const regex = /mul\(\d+,\s*\d+\)/g;
  const matches = data.match(regex);
  let sum = 0;
  matches?.forEach(m => {
    const nums = m.match(/\d+/g)?.map(Number);
    if (nums) {
      sum += (nums[0] * nums[1]);
    }
  });

  console.log(sum);

  // Part 2
  const newRegex = /do\(\)|don't\(\)|mul\(\d+,\s*\d+\)/g;
  const newMatches = data.match(newRegex);
  let count = 0;
  const matchesLen = newMatches?.length ?? 0;
  let newSum = 0;

  while (count < matchesLen) {
    if (newMatches?.at(count) === "don't()") {
      while (newMatches[count] !== "do()" && count < matchesLen) {
        count++;
      }
    }

    if (newMatches?.at(count) === "do()") {
      while (count < matchesLen && !/mul\(\d+,\s*\d+\)/g.test(newMatches[count])) {
        count++;
      }
    }

    if (count < matchesLen) {
      const nums = newMatches?.at(count)?.match(/\d+/g)?.map(Number);
      if (nums) {
        newSum += (nums[0] * nums[1]);
      }
    }
    count++;
  }

  console.log(newSum);
} catch (err) {
  console.error(err);
}
