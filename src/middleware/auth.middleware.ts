import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ERR_INVALID_AUTH_HEADER, ERR_MISSING_AUTH_HEADER, ERR_USER_DISABLED } from 'src/errors';
import { firebaseAuth, getUserDetails } from 'src/utils/firebase';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get('X-Authorization-Firebase');
    if(!authHeader) {
      throw new UnauthorizedException(ERR_MISSING_AUTH_HEADER);
    }

    const [authKey, authToken] = authHeader.split(' ');

    if (authKey !== 'Bearer') {
      throw new UnauthorizedException(ERR_INVALID_AUTH_HEADER);
    }

    if (!authToken) {
      throw new UnauthorizedException(ERR_INVALID_AUTH_HEADER);
    }

    const decodedToken = await firebaseAuth(authToken);
    const userDetails = await getUserDetails(decodedToken.uid);

    if (userDetails.disabled) {
      throw new UnauthorizedException(ERR_USER_DISABLED);
    }
    next();
  }
}
