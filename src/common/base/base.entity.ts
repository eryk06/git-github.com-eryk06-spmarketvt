import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn
} from 'typeorm';
import { DayjsDate } from '@/core/decorators';

export class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => `timezone('Asia/Ho_Chi_Minh', now())`,
    transformer: DayjsDate()
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: () => `timezone('Asia/Ho_Chi_Minh', now())`,
    onUpdate: "timezone('Asia/Ho_Chi_Minh', now())",
    transformer: DayjsDate()
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp without time zone'
  })
  deletedAt!: Date;

  constructor() {
    super();
  }
}
