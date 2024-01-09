import { Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { HttpBadRequestError } from 'src/core';
import { FOLDER_NAME } from '../environments';
import streamifier from 'streamifier';
import { CloudinaryResponse } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  async uploadFileImage(
    file: Express.Multer.File,
    folder: string = FOLDER_NAME
  ): Promise<CloudinaryResponse> {
    const options: UploadApiOptions = {
      folder: folder,
      timestamp: Math.floor(Date.now() / 1000),
      unique_filename: true
    };

    return new Promise((resolve, rejects) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            rejects(new HttpBadRequestError(error.message));
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFileImage(publicId: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, rejects) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          rejects(new HttpBadRequestError(error.message));
        }
      });
    });
  }

  async uploadMultipleFileImage(
    files: Express.Multer.File[],
    folder?: string
  ): Promise<CloudinaryResponse[]> {
    const result: CloudinaryResponse[] = [];
    for await (const file of files) {
      result.push(await this.uploadFileImage(file, folder));
    }
    return result;
  }

  async deleteFolder(folder: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, rejects) => {
      cloudinary.api.delete_resources_by_prefix(folder, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          rejects(new HttpBadRequestError(error.message));
        }
      });
    });
  }
}
