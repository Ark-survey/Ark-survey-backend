// user-tier-list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetaData, MetaDataType } from './meta-data.interface';
import { formatMetaData } from 'utils';

@Injectable()
export class MetaDataService {
  constructor(
    @InjectModel('MetaData')
    private readonly metaDataModel: Model<MetaData>,
  ) {}

  public async latest(): Promise<MetaDataType> {
    return formatMetaData((await this.metaDataModel.find())[0]);
  }
}
