import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
