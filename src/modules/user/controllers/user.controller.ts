import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all users
  @Get()
  async getAllUsers(): Promise<any> {
    const users = await this.userService.getAllUser();
    return {
      message: 'Get all users successfully',
      users,
    };
  }
}
