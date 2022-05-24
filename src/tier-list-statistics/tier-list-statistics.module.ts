import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TierListModule } from 'src/tier-list/tier-list.module';
import { TierListStatisticController } from './tier-list-statistics.controller';
import { allModeStatistics } from './tier-list-statistics.schema';
import { TierListStatisticService } from './tier-list-statistics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AllModeStatistics', schema: allModeStatistics }, //name与@injectModel使用的一致
    ]),
    TierListModule,
  ],
  controllers: [TierListStatisticController],
  providers: [TierListStatisticService]
})
export class TierListStatisticModule {}
