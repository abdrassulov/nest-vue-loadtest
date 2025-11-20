import { Controller, Get, Query, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}


  @Get()
  findAll(
    @Query('limit') limit = '100',
    @Query('offset') offset = '0',
  ): Promise<Item[]> {
    return this.itemsService.findAll(Number(limit), Number(offset));
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(Number(id));
  }
}
