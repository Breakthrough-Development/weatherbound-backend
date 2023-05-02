import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard() {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const type = request.params.type;

    if (type === 'web') {
      request.strategy = 'web';
    } else if (type === 'desktop') {
      request.strategy = 'desktop';
    } else {
      throw new BadRequestException('Invalid auth type');
    }

    return super.canActivate(request);
  }
}
