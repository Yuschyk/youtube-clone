import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

@ApiTags("media")
@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(200)
  @Auth()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        folder: {
          type: "string",
        },
        media: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("media"))
  async saveFile(
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query() folder: string
  ) {
    return this.mediaService.saveMedia(mediaFile, folder);
  }
}
