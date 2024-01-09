import { Injectable, NotAcceptableException } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import {
  ALGORITHM_AES,
  ALGORITHM_SHA,
  SECRET_KEY,
  SECRET_KEY_IV
} from '../environments';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  get() {
    const secretKey =
      this.configService.get<string>('SECRET_KEY') || (SECRET_KEY as string);
    const secretIV =
      this.configService.get<string>('SECRET_KEY_IV') ||
      (SECRET_KEY_IV as string);
    const key = createHash(
      this.configService.get<string>('ALGORITHM_SHA') || ALGORITHM_SHA
    )
      .update(secretKey)
      .digest('hex')
      .substring(0, 32);
    const encryptionIV = createHash(
      this.configService.get<string>('ALGORITHM_SHA') || ALGORITHM_SHA
    )
      .update(secretIV)
      .digest('hex')
      .substring(0, 16);
    return {
      key,
      encryptionIV
    };
  }

  encryptData(data: string): string {
    const { key, encryptionIV } = this.get();
    const cipher = createCipheriv(
      this.configService.get<string>('ALGORITHM_AES') || ALGORITHM_AES,
      key,
      encryptionIV
    );
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64'); // Encrypts data and converts to hex and base64
  }

  decryptData(token: string) {
    const buff = Buffer.from(token, 'base64');
    const { key, encryptionIV } = this.get();
    const decipher = createDecipheriv(
      this.configService.get<string>('ALGORITHM_AES') || ALGORITHM_AES,
      key,
      encryptionIV
    );
    try {
      // Decrypts data and converts to utf8
      const decryptData =
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8');
      return decryptData;
    } catch (error) {
      throw new NotAcceptableException('Not acceptable');
    }
  }
}
