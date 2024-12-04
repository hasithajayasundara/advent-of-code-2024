const fs = require('fs');

try {
  const data = fs.readFileSync('day4.txt', 'utf8');

} catch (err) {
  console.error(err);
}
