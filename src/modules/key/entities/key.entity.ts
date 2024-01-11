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

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;

  @Column({ type: 'varchar', length: 255, default: [] })
  refreshTokensUsed: Array<string>;

  @Column({ type: 'varchar', length: 255 })
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  constructor(partial: Partial<KeyEntity>) {
    super();
    Object.assign(this, partial);
  }
}
