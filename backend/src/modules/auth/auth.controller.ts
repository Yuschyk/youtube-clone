import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() loginData: AuthDto) {
    return this.authService.login(loginData);
  }

  @HttpCode(201)
  @Post('register')
  register(@Body() registerData: AuthDto) {
    return this.authService.register(registerData);
  }
}
