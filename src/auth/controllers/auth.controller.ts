import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from '../dtos';
import { GoogleGuard, LocalAuthGuard } from '../guards';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SessionSerializer } from '../serializer';
import { HttpBadRequestError, TransformInterceptor } from '../../core';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionSerializer: SessionSerializer,
  ) {}

  @Post('register')
  @UseInterceptors(TransformInterceptor<RegisterDTO>)
  async register(@Body() registerDTO: RegisterDTO): Promise<any> {
    return await this.authService.register(registerDTO);
  }

  @Post('login')
  @UseInterceptors(TransformInterceptor<LoginDTO>)
  @UseGuards(LocalAuthGuard, ThrottlerGuard)
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: any,
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
  @UseGuards(GoogleGuard)
  async loginGoogle(@Req() request: any): Promise<any> {
    return await this.authService.loginGoogle(request);
  }

  // @Get('refresh-token')
  // async refreshToken(@Req() request: Request): Promise<any> {
  //   return await this.authService.refreshToken();
  // }

  // @Post('change-password')
  // @HttpCode(200)
  // @UseGuards(JwtStrategy)
  // async changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
  //   return await this.authService.changePassword(changePasswordDTO);
  // }

  // @Get('logout')
  // async logout(res: any): Promise<any> {
  //   return await this.authService.logout();
  // }

  @Get('csrf')
  async getCSRFToken(
    @Req() request: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const csrfToken = request.csrfToken();

    response.send({ csrfToken });
  }
}
