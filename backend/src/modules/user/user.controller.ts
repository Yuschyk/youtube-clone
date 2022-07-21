import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  @HttpCode(200)
  async getCurrentUserProfile(@CurrentUser('id') userId: number) {
    return await this.userService.getUserById(userId);
  }

  @Get('profile/:id')
  @Auth()
  @HttpCode(200)
  async getProfileById(@Param('id') userId: string) {
    return await this.userService.getUserById(Number(userId));
  }

  @Put(':id')
  @Auth()
  @HttpCode(200)
  async updateProfile(
    @Param('id') userId: string,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.updateProfile(Number(userId), userData);
  }

  @Put('subscribe/:id')
  @Auth()
  @HttpCode(200)
  async subscribeUser(
    @CurrentUser('id') userId: number,
    @Param('id') subscriptionUserId: string,
  ) {
    return await this.userService.subscribe(userId, Number(subscriptionUserId));
  }
}
