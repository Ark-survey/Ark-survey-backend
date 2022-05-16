import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getBackendStatus(): string {
    return 'Running';
  }
}
