import { BaseEntity } from 'src/common/base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({
  name: 'apikey',
  orderBy: {
    created_at: 'DESC'
  }
})
export class ApiKeyEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'varchar', length: 255, default: true })
  status: boolean;

  @Column({ type: 'varchar', length: 255, enum: ['0000', '1111', '2222'] })
  pesmissions: [string];

  constructor(partial: Partial<ApiKeyEntity>) {
    super();
    Object.assign(this, partial);
  }
}
