import { BaseEntity } from 'src/common/base';
import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from 'typeorm';
import { ROLE, STATUS } from '@/core';

@Entity({
  name: 'user',
  orderBy: {
    created_at: 'DESC',
  },
})
export class UserEntity extends BaseEntity {
  @Unique(['email'])
  @Index()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Index()
  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER,
  })
  role: ROLE;

  @Index()
  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;

  @Index()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    charset: 'UTF8',
  })
  full_name: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  address: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  avatar: string;

  @Column({ type: 'varchar', length: 225, default: null })
  twoFactorTempSecret: string;

  @Column({ type: 'boolean', default: false })
  twoFactorEnable: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  googleAuthId: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
