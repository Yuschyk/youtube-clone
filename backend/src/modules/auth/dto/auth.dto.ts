import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
