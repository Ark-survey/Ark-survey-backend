import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { VersionAnnouncementType } from './version-announcement.interface';
import { VersionAnnouncementService } from './version-announcement.service';

interface Response<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('versionAnnouncement')
export class VersionAnnouncementController {
  constructor(private readonly versionAnnouncementService: VersionAnnouncementService) {}

  @Post('getList')
  @HttpCode(200)
  public async getList(): Promise<Response<VersionAnnouncementType[]>> {
    return {
      code: 200,
      data: await this.versionAnnouncementService.getList(),
      message: 'success',
    };
  }
}
