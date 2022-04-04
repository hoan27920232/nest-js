/* eslint-disable */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    Logger.log(`To the catch`, "Filter")
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const errorResponse = {
      code: statusCode,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };
    Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'Logging error filer');
    response.status(404).json(errorResponse);
  }
}
