import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  findAll(limit = 100, offset = 0): Promise<Item[]> {
    return this.repo.find({
      take: limit,
      skip: offset,
      order: { id: 'ASC' }, 
    });
  }

  
  async findOne(id: number): Promise<Item> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    return item;
  }

 
  create(itemData: Partial<Item>): Promise<Item> {
    const item = this.repo.create(itemData);
    return this.repo.save(item);
  }

 
  async update(id: number, itemData: Partial<Item>): Promise<Item> {
    await this.repo.update(id, itemData);
    const updatedItem = await this.repo.findOneBy({ id });
    if (!updatedItem) {
      throw new Error(`Item with id ${id} not found`);
    }
    return updatedItem;
  }


  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new Error(`Item with id ${id} not found`);
    }
  }
}
