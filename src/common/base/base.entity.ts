import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn,
} from 'typeorm';
import { DayjsDate } from '@/core/decorators';
import { uuidv7 } from 'uuidv7';

export class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string = uuidv7();

  @CreateDateColumn({
    transformer: DayjsDate(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    transformer: DayjsDate(),
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
