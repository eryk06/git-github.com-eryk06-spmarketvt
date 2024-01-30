import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services';
import { JwtAccessTokenGuard } from '../../../auth/guards';
import { ExcludeNullInterceptor } from '../../../core';

// @UseGuards(JwtAccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all users
  @UseInterceptors(ExcludeNullInterceptor)
  @Get()
  async findAllUsers(): Promise<any> {
    const users = await this.userService.findAllUsers();
    return {
      message: 'Get all users successfully',
      data: users,
    };
  }
}
