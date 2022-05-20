import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetaDataController } from './meta-data.controller';
import { metaDataSchema } from './meta-data.schema';
import { MetaDataService } from './meta-data.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'MetaData', schema: metaDataSchema }])],
  controllers: [MetaDataController],
  providers: [MetaDataService],
})
export class MetaDataModule {}
