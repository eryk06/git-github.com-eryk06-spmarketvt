import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services';
import { JwtAccessTokenGuard } from '../../../auth/guards';
import { ExcludeNullInterceptor } from '../../../core';

// @UseGuards(JwtAccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create user
  @Post('create-user')
  async createUser(@Body() body: any): Promise<any> {
    const user = await this.userService.createUser(body);
    return {
      message: 'Create user successfully',
      data: user,
    };
  }

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

  // update full name with uuid
  @Patch('fullname')
  async updateFullNameUser(
    @Res() response: any,
    @Body('full_name') full_name: string,
  ): Promise<any> {
    const user = await this.userService.updateFullNameUser(
      response.locals.user.uuid,
      full_name,
    );

    return {
      message: 'Update full name successfully',
      data: user,
    };
  }
}
