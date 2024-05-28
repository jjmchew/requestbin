import { useMongo } from './mongo.js';

async function main() {
  try {
    await useMongo.put({ name: 'James', num: 22, desc: 'this is a longer string' })
    let data = await useMongo.getAll();
    console.log('===== data', data);

  } catch (e) {
    console.error(e);
  }
}

main();
