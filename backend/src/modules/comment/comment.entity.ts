import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { VideoEntity } from '../video/video.entity';
import { UserEntity } from '../user/user.entity';

@Entity('Comment')
export class CommentEntity extends BaseEntity {
  @Column({ default: '' })
  message: string;

  @ManyToOne(() => VideoEntity, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
