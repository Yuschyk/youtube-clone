import { ApiProperty } from "@nestjs/swagger";

export class SaveFileDto {
  @ApiProperty()
  mediaFile: Express.Multer.File;
  @ApiProperty()
  folder: string;
}
