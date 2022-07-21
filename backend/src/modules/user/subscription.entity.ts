import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { UserEntity } from './user.entity';

@Entity('Subscription')
export class SubscriptionEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  @JoinColumn({ name: 'to_user_id' })
  toUser: UserEntity;
}
