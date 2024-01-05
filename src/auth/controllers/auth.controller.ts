import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from '../dtos';
import { Request, Response } from 'express';
import { GoogleGuard, LocalAuthGuard } from '../guards';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SessionSerializer } from '../serializer';
import { HttpBadRequestError } from '../../core';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionSerializer: SessionSerializer
  ) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDTO: RegisterDTO): Promise<any> {
    return await this.authService.register(registerDTO);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard, ThrottlerGuard)
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    const user = await this.authService.login(loginDTO, response);

    this.sessionSerializer.serializeUser(user, (error, serializedUser) => {
      if (error) {
        throw new HttpBadRequestError(error.message);
      } else {
        response.locals.user = serializedUser;
      }
    });

    return user;
  }

  @Get('google')
  @HttpCode(200)
  @UseGuards(GoogleGuard)
  async loginGoogle(@Req() request: Request): Promise<any> {
    return await this.authService.loginGoogle(request);
  }

  @Get('refresh-token')
  async refreshToken(@Req() request: Request): Promise<any> {
    return await this.authService.refreshToken();
  }

  // @Post('change-password')
  // @HttpCode(200)
  // @UseGuards(JwtStrategy)
  // async changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
  //   return await this.authService.changePassword(changePasswordDTO);
  // }

  @Get('logout')
  @HttpCode(200)
  async logout(res: Response): Promise<any> {
    return await this.authService.logout();
  }

  @Get('csrf')
  @HttpCode(200)
  async getCSRFToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const csrfToken = request.csrfToken();

    response.send({ csrfToken });
  }
}
