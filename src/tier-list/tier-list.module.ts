import { Logger, Module } from '@nestjs/common';
import { TierListController } from './tier-list.controller';
import { TierListService } from './tier-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { tierListSchema } from './tier-list.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TierList', schema: tierListSchema }, //name与@injectModel使用的一致
    ]),
    UserModule
  ],
  controllers: [TierListController],
  providers: [TierListService],
  //export tierListService for 统计模块
  exports: [
    TierListService,
  ],
})
export class TierListModule {

}
