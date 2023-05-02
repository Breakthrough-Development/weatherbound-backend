// google-auth.guard.ts
import { AuthGuard } from '@nestjs/passport';
import { BadRequestException, ExecutionContext } from '@nestjs/common';

export class GoogleAuthGuard extends AuthGuard(['web', 'desktop']) {
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

    return request;
  }
}
