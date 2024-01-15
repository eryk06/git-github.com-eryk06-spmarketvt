import { BaseEntity } from 'src/common/base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../../user';

@Entity({
  name: 'key',
  orderBy: {
    created_at: 'DESC',
  },
})
export class KeyEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 600 })
  publicKey: string;

  @Column({
    type: 'varchar',
    length: 600,
    default: null,
  })
  refresh_token: string;

  @Column({ type: 'varchar', length: 600, default: [] })
  refresh_tokens_used: string[];

  @OneToOne(() => UserEntity, (user) => user.uuid)
  @JoinColumn()
  user: UserEntity;

  constructor(partial: Partial<KeyEntity>) {
    super();
    Object.assign(this, partial);
  }
}
