import {
  Controller,
  HttpCode,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadService } from '../services/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(
    @Req() req: Request,
    @UploadedFile(new ParseFilePipeBuilder().build())
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadSingle(req, file);
  }
}
