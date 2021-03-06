import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { TierListService } from 'src/tier-list/tier-list.service';
import { computeAllModeStatistic } from './stat-utils/average';
import { AllModeStatisticsDTO } from './tier-list-statistics.dto';
// import { formatAllModeStatistics } from './tier-list-statistics.dto';
import { AllModeStatistics } from './tier-list-statistics.interface';

@Injectable()
export class TierListStatisticService {
  private readonly logger = new Logger(TierListStatisticService.name);

  constructor(
    @InjectModel('AllModeStatistics')
    private readonly statisticsModel: Model<AllModeStatistics>,
    private readonly tierListService: TierListService,
  ) {}

  //基本测试通过
  //该方法将在分钟数整除5的时候运行一次，比如15分0秒，20分0秒
  @Cron('0 */10 * * * *')
  public async computeAllModeStatisticsAndSave(): Promise<AllModeStatisticsDTO> {
    this.logger.debug('定时任务：computeAllModeStatisticsAndSave ');
    const allTierList = await this.tierListService.findAll();
    // this.logger.debug((allTierList).length)
    const allModeStat = computeAllModeStatistic(allTierList);

    /**
     * {flattenMaps: true} 的作用，
     * //没有: toObject返回：{
     *  data: {}
     * }
     * //有: toObject返回完整的POJO：{
     *  data:{
     *      ...
     *  }
     * }
     */
    const res = (
      await this.statisticsModel.create({
        data: allModeStat,
      })
    ).toObject({ flattenMaps: true });

    // this.logger.debug(res);
    return res.data;
  }
  public async getLatest(): Promise<AllModeStatisticsDTO> {
    const res = (await this.statisticsModel.findOne().sort({ _id: -1 }).limit(1)).toObject({ flattenMaps: true });
    return res.data;
  }

  // public async getLatestTest(): Promise<AllModeStatistics>{
  //     const res = (await  this.statisticsModel.findOne().sort({_id: -1}).limit(1));
  //     return res;
  // }

  public async getLatestByKeys(keys: string[]): Promise<AllModeStatisticsDTO> {
    const all = await this.getLatest();
    const res: AllModeStatisticsDTO = {};
    this.logger.debug(Object.keys(all));
    for (const key of keys) {
      if (key in all) {
        res[key] = all[key];
      } else {
        res[key] = null;
      }
    }
    return res;
  }
}

/* 往db中添加一条dummy data
        return await this.statisticsModel.create({ 
            data:{
                'cc' : {
                    count: 0,
                    validCount: 0,
                    charStatistics: {
                        'chen2': {
                            avgValue: 5,
                            count: 0,
                            distributions: [0,0,0,0,0],
                        }
                    },
                    createdDate: new Date().getTime()
                },
            }
            
        });

*/
