import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTierListController } from './user-tier-list.controller';
import { userTierListSchema } from './user-tier-list.schema';
import { UserTierListService } from './user-tier-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserTierList', schema: userTierListSchema },
    ]),
  ],
  controllers: [UserTierListController],
  providers: [UserTierListService],
})
export class UserTierListModule {}
