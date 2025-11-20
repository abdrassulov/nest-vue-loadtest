const { DataSource } = require('typeorm');
const { Item } = require('./items/item.entity');

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'testdb',
  entities: [Item],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Item);

  const items = [];
  for (let i = 1; i <= 50000; i++) {
    const item = new Item();
    item.name = `Item ${i}`;
    item.created_at = new Date();
    items.push(item);
  }

  await repo.save(items);
  console.log('Seed finished!');
  process.exit(0);
}

seed();
