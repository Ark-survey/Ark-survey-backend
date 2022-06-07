import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetaDataModule } from './meta-data/meta-data.module';
// import { UserTierListModule } from './user-tier-list/user-tier-list.module';
import { ConfigModule } from '@nestjs/config';
import { VersionAnnouncementModule } from './version-announcement/version-announcement.module';
import { UserModule } from './user/user.module';
import { TierListModule } from './tier-list/tier-list.module';
import { TierListStatisticModule } from './tier-list-statistics/tier-list-statistics.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CharBoxModule } from './char-box/char-box.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),//定时任务
    
    MongooseModule.forRoot(
      'mongodb://' +
        process.env.DATABASE_USER +
        ':' +
        process.env.DATABASE_PASSWORD +
        '@' +
        process.env.DATABASE_HOST +
        ':' +
        process.env.DATABASE_PORT +
        '/' +
        process.env.DATABASE_NAME,
    ),
    // UserTierListModule,
    MetaDataModule,
    VersionAnnouncementModule,
    UserModule,
    TierListModule,
    TierListStatisticModule,
    CharBoxModule,
  ],
  controllers: [AppController,],
  providers: [AppService, ],
})
export class AppModule {}
