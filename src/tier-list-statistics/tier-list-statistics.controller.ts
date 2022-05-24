import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import mongoose from 'mongoose';
import { RealIP } from 'nestjs-real-ip';
import { AllModeStatisticsDTO, GetStatisticsByKeysDTO } from './tier-list-statistics.dto';
import { AllModeStatistics } from './tier-list-statistics.interface';
import { TierListStatisticService } from './tier-list-statistics.service';

@Controller('tierListStatistics')
export class TierListStatisticController {
    private readonly logger = new Logger(TierListStatisticController.name)

    constructor(private readonly statisticService: TierListStatisticService) {}

    @Post('createOne')
    @HttpCode(200)
    public async createOne(): Promise<NormalResponse<AllModeStatisticsDTO>> {
        const res = await this.statisticService.computeAllModeStatisticsAndSave();
        // this.logger.debug('111', typeof(res), res instanceof mongoose.Document);
        return {
        code: 200,
        data: res,
        message: 'success',
      };
    }

    @Post('getLatest')
    @HttpCode(200)
    public async getLatest(): Promise<NormalResponse<AllModeStatisticsDTO>> {
        const res = await this.statisticService.getLatest();
      return {
        code: 200,
        data: res,
        message: 'success',
      };
    }

    // @Post('getLatestTest')
    // @HttpCode(200)
    // public async getLatestTest(): Promise<NormalResponse<AllModeStatistics>> {
    //     const res = await this.statisticService.getLatestTest();
    //   return {
    //     code: 200,
    //     data: res,
    //     message: 'success',
    //   };
    // }

    @Post('getLatestByKeys')
    @HttpCode(200)
    public async getLatestByKeys(
      @Body() request: GetStatisticsByKeysDTO
    ): Promise<NormalResponse<AllModeStatisticsDTO>> {
        const res = await this.statisticService.getLatestByKeys(request.keys);
        
      return {
        code: 200,
        data: res,
        message: 'success',
      };
    }


    @Get('my-ip')
    get(@RealIP() ip: string): string {
      return ip;
    }
}
