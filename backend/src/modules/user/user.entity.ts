import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { VideoEntity } from "../video/video.entity";
import { SubscriptionEntity } from "./subscription.entity";

@Entity("User")
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false, name: "is_verified" })
  isVerified: boolean;

  @Column({ default: "" })
  avatar: string;

  @Column({ default: 0 })
  subscribersCount: number;

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.toUser)
  subscribers: SubscriptionEntity[];
}
