import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
  type UpdateEvent
} from 'typeorm';
import { UserEntity } from '../entities';
import { generateHash } from '@/core';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity | Function {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void | Promise<any> {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void | Promise<any> {
    const entity = event.entity as UserEntity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password!);
    }
  }
}
