import { Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { AllModeStatistics } from './tier-list-statistics.interface';
import { TierListStatisticService } from './tier-list-statistics.service';

@Controller('tierListStatistics')
export class TierListStatisticController {
    private readonly logger = new Logger(TierListStatisticController.name)

    constructor(private readonly statisticService: TierListStatisticService) {}

    @Post('createOne')
    @HttpCode(200)
    public async createOne(): Promise<NormalResponse<AllModeStatistics>> {
        const res = await this.statisticService.computeAllModeStatisticsAndSave();
      return {
        code: 200,
        data: res,
        message: 'success',
      };
    }

    @Post('getLatest')
    @HttpCode(200)
    public async getLatest(): Promise<NormalResponse<AllModeStatistics>> {
        const res = await this.statisticService.computeAllModeStatisticsAndSave();
      return {
        code: 200,
        data: res,
        message: 'success',
      };
    }
}
