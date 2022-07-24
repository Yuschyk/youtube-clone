import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { UserEntity } from "../user/user.entity";
import { CommentEntity } from "../comment/comment.entity";

@Entity("Video")
export class VideoEntity extends BaseEntity {
  @Column({ default: "" })
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false, name: "is_public" })
  isPublic: boolean;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: "" })
  url: string;

  @Column({ default: "" })
  thumbnail: string;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.video)
  comments: CommentEntity[];
}
