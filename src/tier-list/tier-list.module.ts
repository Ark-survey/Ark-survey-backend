import { Logger, Module } from '@nestjs/common';
import { TierListController } from './tier-list.controller';
import { TierListService } from './tier-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { tierListSchema } from './tier-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TierList', schema: tierListSchema }, //name与@injectModel使用的一致
    ]),
  ],
  controllers: [TierListController],
  providers: [TierListService]
})
export class TierListModule {

}
