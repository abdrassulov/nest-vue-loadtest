import { DataSource } from 'typeorm';
import { Item } from './items/item.entity';

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

  const total = 50000;
  const batchSize = 1000;

  for (let i = 0; i < total; i += batchSize) {
    const items: Partial<Item>[] = [];
    for (let j = 0; j < batchSize; j++) {
      const num = i + j + 1;
      items.push({ name: `Item ${num}` });
    }
    await repo.save(items);
    console.log(`Inserted ${i + batchSize} items`);
  }

  console.log('Seeding finished!');
  process.exit(0);
}

seed().catch((err) => console.error(err));
