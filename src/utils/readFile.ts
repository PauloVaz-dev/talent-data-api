const fs = require('fs');
const readline = require('readline');
import path from 'path';

export async function processLineByLine(organizations, tags) {
  const filePath = path.join(__dirname, '../../../', 'fixtures');
  const fileStream = fs.createReadStream(`${filePath}/products.txt`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lines = 0;
  const items = [];

  for await (const line of rl) {
    lines = lines + 1;
    const department = line.split(',')[1];
    const tag = line.split(',')[4];

    if (tags) {
      const query = tags?.split(',');
      query.map((item) => {
        if (tag.includes(item) && department.includes(organizations[0]?.name)) {
          items.push(JSON.parse(line));
        }
      });
    } else {
      if (department.includes(organizations[0]?.name)) {
        items.push(JSON.parse(line));
      }
    }
  }

  return items;
}
