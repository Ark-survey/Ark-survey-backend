import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetaDataModule } from './meta-data/meta-data.module';
import { UserTierListModule } from './user-tier-list/user-tier-list.module';

@Module({
  imports: [
    // mongodb://localhost/arksurvey
    MongooseModule.forRoot('mongodb://backend:123456@121.4.17.235:27017/arksurvey'),
    UserTierListModule,
    MetaDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
