import { BaseEntity } from 'src/common/base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ROLE, STATUS } from '@/core';

@Entity({
  name: 'user',
  orderBy: {
    created_at: 'DESC'
  }
})
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER
  })
  role: ROLE;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  fullname: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  address: string;

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
