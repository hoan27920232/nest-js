/* eslint-disable */
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization) {
        return false;
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }
  async validateToken(token : string) {
    if(token.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    const getToken = token.split(' ')[1];
    try{
        const decoded = await jwt.verify(getToken, process.env.SECRET);
        return decoded;
    }catch(err){
        const message = 'Token error ' + (err.message || err.name);
        throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
