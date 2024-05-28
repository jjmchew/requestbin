import { useMongo } from './mongo.js';

async function main() {
  try {
    let data = await useMongo.getAll();
    console.log('===== data', data);
  } catch (e) {
    console.error(e);
  }
}

main()
