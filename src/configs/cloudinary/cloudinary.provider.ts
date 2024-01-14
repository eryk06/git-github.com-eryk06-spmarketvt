import { Provider } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME } from '../environments';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.get<string>('CLOUD_NAME') || CLOUD_NAME,
      api_key: configService.get<string>('API_KEY') || API_KEY,
      api_secret: configService.get<string>('API_SECRET') || API_SECRET,
      secure: true,
    });
  },
  inject: [ConfigService],
};

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
