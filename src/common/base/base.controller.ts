/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { PaginationDTO } from './base.dto';

export function BaseController<Entity extends BaseEntity>() {
  abstract class Controller {
    abstract relations: string[];

    constructor(public readonly service: BaseService<Entity>) {}

    @Post('create')
    create(@Body() body): Promise<Entity> {
      return this.service.create(body);
    }

    @Get('all')
    getAll(@Query() query: PaginationDTO): Promise<[Entity[], number]> {
      return this.service.getAllWithPagination(
        query,
        {},
        //@ts-ignore
        { createdAt: 'DESC' },
        ...this.relations
      );
    }

    @Get('detail/:id')
    getDetail(@Param('id') id: string): Promise<Entity> {
      return this.service.getOneByIdOrFail(id, ...this.relations);
    }

    @Patch('update/:id')
    update(@Param('id') id: string, @Body() body): Promise<Entity> {
      return this.service.updateById(id, body);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<Entity> {
      return this.service.softDeleteById(id);
    }
  }

  return Controller;
}
