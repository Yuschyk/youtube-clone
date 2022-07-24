import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoEntity } from "./video.entity";
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from "typeorm";
import { UpdateVideoDto } from "./video.dto";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
  ) {}

  async getAll(searchValue?: string) {
    let options: FindOptionsWhereProperty<VideoEntity> = {};

    if (searchValue) {
      options = {
        title: ILike(`%${searchValue}%`),
      };
    }

    return this.videoRepository.find({
      where: {
        ...options,
        isPublic: true,
      },
      order: {
        createdAt: "DESC",
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    });
  }

  async getMostPopularVideos() {
    return this.videoRepository.find({
      where: {
        views: MoreThan(0),
      },
      order: {
        views: "DESC",
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    });
  }

  async getVideoById(id: number, isPublic = false) {
    const video = this.videoRepository.findOne({
      where: isPublic
        ? {
            id,
            isPublic: true,
          }
        : {
            id,
          },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
    });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    return video;
  }

  async updateVideo(videoId: number, videoData: UpdateVideoDto) {
    const video = await this.getVideoById(videoId);

    return await this.videoRepository.save({
      ...video,
      ...videoData,
    });
  }

  async deleteVideo(id: number) {
    return this.videoRepository.delete({
      id,
    });
  }

  async createVideo(userId: number) {
    const defaultValues = {
      title: "",
      description: "",
      isPublic: true,
      url: "",
      thumbnail: "",
      user: {
        id: userId,
      },
    };

    const createdVideo = this.videoRepository.create(defaultValues);
    return await this.videoRepository.save(createdVideo);
  }

  async updateViewsCount(videoId: number) {
    const video = await this.getVideoById(videoId);

    await this.videoRepository.save({
      ...video,
      views: video.views++,
    });
  }

  async updateLikesCount(videoId: number) {
    const video = await this.getVideoById(videoId);

    await this.videoRepository.save({
      ...video,
      views: video.views++,
    });
  }
}
