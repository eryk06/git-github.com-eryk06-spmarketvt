import * as lodash from 'lodash';
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import {
  ExceptionInfo,
  HttpResponseError,
  ResponseStatus,
} from '../interfaces';
import { UNDEFINED } from '../constants';
import { NODE_ENV } from '@/configs/environments';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const exceptionStatus =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ExceptionInfo =
      exception.getResponse() as ExceptionInfo;
    const errorMessage = lodash.isString(errorResponse)
      ? errorResponse
      : errorResponse.message;
    const errorInfo = lodash.isString(errorResponse)
      ? null
      : errorResponse.error;

    const data: HttpResponseError = {
      status: ResponseStatus.Error,
      message: errorMessage,
      error:
        errorInfo?.message ||
        (lodash.isString(errorInfo) ? errorInfo : JSON.stringify(errorInfo)),
      debug: NODE_ENV ? errorInfo?.stack || exception.stack : UNDEFINED,
    };

    // default 404
    if (exceptionStatus === HttpStatus.NOT_FOUND) {
      data.error = data.error || `Not found`;
      data.message =
        data.message || `Invalid API: ${request.method} > ${request.url}`;
    }

    return response.status(errorInfo?.status || exceptionStatus).jsonp(data);
  }
}
