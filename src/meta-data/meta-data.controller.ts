import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { MetaDataType } from './meta-data.interface';
import { MetaDataService } from './meta-data.service';

interface Response<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('metaData')
export class MetaDataController {
  constructor(private readonly metaDataService: MetaDataService) {}

  @Post('latest')
  @HttpCode(200)
  public async latest(): Promise<Response<MetaDataType>> {
    return {
      code: 200,
      data: await this.metaDataService.latest(),
      message: 'success',
    };
  }
}
