import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { ERR_DUPLICATE_EXISTS } from 'src/errors';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    switch (exception.code) {
      case 11000: // Duplicate value error code for mongodb
        return response.status(HttpStatus.BAD_REQUEST).json(ERR_DUPLICATE_EXISTS(exception.message));
    }
  }
}