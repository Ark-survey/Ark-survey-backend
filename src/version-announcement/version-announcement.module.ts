import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VersionAnnouncementController } from './version-announcement.controller';
import { versionAnnouncementSchema } from './version-announcement.schema';
import { VersionAnnouncementService } from './version-announcement.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'VersionAnnouncement', schema: versionAnnouncementSchema }])],
  controllers: [VersionAnnouncementController],
  providers: [VersionAnnouncementService],
})
export class VersionAnnouncementModule {}
