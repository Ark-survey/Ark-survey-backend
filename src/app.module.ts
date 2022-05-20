import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetaDataModule } from './meta-data/meta-data.module';
import { UserTierListModule } from './user-tier-list/user-tier-list.module';
import { ConfigModule } from '@nestjs/config';
import { VersionAnnouncementModule } from './version-announcement/version-announcement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    UserTierListModule,
    MetaDataModule,
    VersionAnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
