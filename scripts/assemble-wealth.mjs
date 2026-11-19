import fs from 'fs';
import { groupA } from './wealth-group-a.mjs';
import { groupB } from './wealth-group-b.mjs';
import { groupC } from './wealth-group-c.mjs';
import { groupD } from './wealth-group-d.mjs';

const allWealth = [...groupA, ...groupB, ...groupC, ...groupD];
console.log('Total wealth calculators assembled:', allWealth.length);

fs.writeFileSync(
  'src/data/calculators/wealth-investing.json',
  JSON.stringify(allWealth, null, 2) + '\n',
  'utf8'
);
console.log('Successfully written to src/data/calculators/wealth-investing.json');
