import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TierListDTO } from 'src/tier-list/tier-list.dto';
import { Tier } from 'src/tier-list/tier-list.interface';
import { TierListService } from 'src/tier-list/tier-list.service';
import { computeAllModeStatistic } from './stat-utils/average';
import { AllModeStatistics, OneModeStatistic } from './tier-list-statistics.interface';

@Injectable()
export class TierListStatisticService {
    private readonly logger = new Logger(TierListStatisticService.name);
    

    constructor(
        @InjectModel('AllModeStatistics')
        private readonly statisticsModel: Model<AllModeStatistics>,
        private readonly tierListService: TierListService,
    ){}

    public async computeAllModeStatisticsAndSave() : Promise<AllModeStatistics>{
        
        const allTierList = await this.tierListService.findAll();
        this.logger.debug((allTierList).length)
        const allModeStat = computeAllModeStatistic(allTierList);
        return await this.statisticsModel.create({
            data: allModeStat
        });

    }
    public async getLatest(): Promise<AllModeStatistics>{
        return await this.statisticsModel.findOne()
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
