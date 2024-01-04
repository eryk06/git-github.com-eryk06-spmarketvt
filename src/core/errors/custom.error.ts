import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionInfo } from '../interfaces';

export class CustomError extends HttpException {
  constructor(options: ExceptionInfo, statusCode?: HttpStatus) {
    super(options, statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
