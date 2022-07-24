import { ApiProperty } from "@nestjs/swagger";

export class UpdateVideoDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  url: string;

  @ApiProperty()
  thumbnail: string;
}
