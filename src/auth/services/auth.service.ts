import { Injectable } from '@nestjs/common';
import { CryptoService, RedisService } from 'src/configs';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from '../dtos';
import { UserEntity } from '@/modules/user/entities';
import { SetCookieRFToken } from '@/core/helpers';
import { Request, Response } from 'express';
import { HttpBadRequestError, HttpInternalServerError } from '@/core/errors';
import { KeyService, UserService } from '@/modules';
import * as crypto from 'crypto';
import { SpeakeasyUtil, getInfoData } from '../../core';
import { createToken } from '../utils';
import { JwtPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly keyService: KeyService,
    private readonly redisService: RedisService,
    private readonly cryptoService: CryptoService,
  ) {}

  // register
  async register(registerDTO: RegisterDTO): Promise<any> {
    try {
      const { email, password } = registerDTO;

      const findUser: UserEntity = await this.userService.getOne({ email });

      if (findUser) {
        throw new HttpBadRequestError('Email already exists');
      }

      const twoFactorTempSecret: string = SpeakeasyUtil.generateSecret();

      const user = await this.userService.create({
        email: email,
        password: password,
        twoFactorTempSecret: twoFactorTempSecret,
      });

      if (user) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });

        const publicKeyString = await this.keyService.createKeyToken({
          uuid: user.uuid,
          publicKey: publicKey,
        });

        if (!publicKeyString) {
          throw new HttpBadRequestError('Create token failed');
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        const payload: JwtPayload = {
          uuid: user.uuid,
          email: user.email,
          role: user.role,
        };

        const tokens = await createToken({
          payload: payload,
          publicKey: publicKeyObject,
          privateKey: privateKey,
        });

        return {
          message: 'Register successfully',
          user: getInfoData({
            filed: ['uuid', 'email', 'role', 'status'],
            object: user,
          }),
          tokens: tokens,
        };
      }

      return {
        message: 'Register failed',
      };
    } catch (error) {
      throw new HttpInternalServerError(error.message);
    }
  }

  // login
  async login(
    loginDTO: LoginDTO,
    response: Response,
    refreshToken = null,
  ): Promise<any> {
    try {
      const { email } = loginDTO;

      const user = await this.userService.getOneOrFail({ email });

      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
      });

      const publicKeyString = await this.keyService.createKeyToken({
        uuid: user.uuid,
        publicKey: publicKey,
      });

      if (!publicKeyString) {
        throw new HttpBadRequestError('Create token failed');
      }

      const publicKeyObject = crypto.createPublicKey(publicKeyString);

      const payload: JwtPayload = {
        uuid: user.uuid,
        email: user.email,
        role: user.role,
      };

      const tokens = await createToken({
        payload: payload,
        publicKey: publicKeyObject,
        privateKey: privateKey,
      });

      const result = {
        message: 'Login successfully',
        user: getInfoData({
          filed: ['uuid', 'email', 'role', 'status'],
          object: user,
        }),
        tokens: tokens,
      };

      // Save access and refresh token to redis
      await this.redisService.setAccessToken(user.uuid, tokens.access_token);
      await this.redisService.setRefreshToken(user.uuid, tokens.refresh_token);

      // set cookie
      const encryptId = this.cryptoService.encryptData(user.uuid);
      SetCookieRFToken(response, encryptId);

      return result;
    } catch (error) {
      throw new HttpInternalServerError(error.message);
    }
  }

  // login google
  async loginGoogle(req: Request): Promise<any> {
    try {
      if (!req.user) {
        throw new HttpBadRequestError('Invalid google account');
      }

      return {
        message: 'Login google successfully',
        user: req.user,
      };
    } catch (error) {
      throw new HttpInternalServerError(error.message);
    }
  }

  // refresh token
  async refreshToken(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpInternalServerError(error.message);
    }
  }

  // change password
  // async changePassword(changePasswordDTO: ChangePasswordDTO): Promise<any> {
  //   try {
  //     const { oldPassword, newPassword } = changePasswordDTO;

  //     const user = await this.userService.getOneOrFail({ uuid: 'user.uid' });

  //     console.log(user);

  //     const isMatchPassword = await comparePassword(oldPassword, user.password);

  //     if (!isMatchPassword) {
  //       throw new HttpBadRequestError('Invalid password');
  //     }

  //     const hashedPassword = await hashPassword(newPassword);

  //     await this.userService.update(user.uuid as any, {
  //       password: hashedPassword
  //     });

  //     return {
  //       message: 'Change password successfully'
  //     };
  //   } catch (error) {
  //     throw new HttpInternalServerError(error.message);
  //   }
  // }

  // logout
  async logout(): Promise<any> {
    try {
      // const delKeyStore = await this.keyService.removeKeyByUid(keyStore.uuid);
      // console.log(delKeyStore);

      const sub = 'user.uuid';
      await this.redisService.delRFToken(sub);
      await this.redisService.delAccessToken(sub);
      const result = { message: 'Logout successfully' };
      return result;
    } catch (error) {
      throw new HttpInternalServerError(error.message);
    }
  }

  // verify email
  async verifyEmail(token: string): Promise<any> {}
}
