// user-tier-list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VersionAnnouncement, VersionAnnouncementType } from './version-announcement.interface';
import { formatVersionAnnouncement } from 'utils';

@Injectable()
export class VersionAnnouncementService {
  constructor(
    @InjectModel('VersionAnnouncement')
    private readonly versionAnnouncementModel: Model<VersionAnnouncement>,
  ) {}

  public async getList(): Promise<VersionAnnouncementType[]> {
    return (await this.versionAnnouncementModel.find().sort({_id:-1})).map(item =>  formatVersionAnnouncement(item));
  }
}
