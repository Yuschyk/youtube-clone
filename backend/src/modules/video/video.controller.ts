import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateVideoDto } from "./video.dto";
import { CurrentUser } from "../user/user.decorator";

@ApiTags("video")
@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get(":id")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async getVideoById(@Param("id") id: string) {
    return this.videoService.getVideoById(Number(id), true);
  }

  @Get("private/:id")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async getPrivateVideo(@Param("id") id: string) {
    return this.videoService.getVideoById(Number(id));
  }

  @Get("all")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async getAllVideos() {
    return this.videoService.getAll();
  }

  @Get("search/:searchPattern")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async searchVideos(@Param("searchPattern") searchPattern: string) {
    return this.videoService.getAll(searchPattern);
  }

  @Put(":id")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async updateVideo(@Param("id") id: string, requestModel: UpdateVideoDto) {
    return this.videoService.updateVideo(Number(id), requestModel);
  }

  @Delete(":id")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async deleteVideo(@Param("id") id: string) {
    return this.videoService.deleteVideo(Number(id));
  }

  @Put("like/:id")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async likeVideo(@Param("id") id: string) {
    return this.videoService.updateLikesCount(Number(id));
  }

  @Put("update-views/:id")
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async updateViewsCount(@Param("id") id: string) {
    return this.videoService.updateViewsCount(Number("id"));
  }

  @Post()
  @Auth()
  @HttpCode(200)
  @ApiBearerAuth()
  async createVideo(@CurrentUser("id") id: number) {
    return this.videoService.createVideo(Number(id));
  }
}
