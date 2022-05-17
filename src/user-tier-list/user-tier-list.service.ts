// user-tier-list.service.ts
import { Injectable , Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { CreateUserTierListDTO, EditUserTierListDTO } from './user-tier-list.dto';
import { UserTierList, UserTierListSimple } from './user-tier-list.interface';
import { formatUserTierList } from 'utils';

//stat
import { intervalMapping } from 'utils/stat-utils';
import { Tier, AllTierListStatistics, Statistic, CharStatistics } from './user-tier-list.interface';


@Injectable()
export class UserTierListService {
  private readonly logger = new Logger(UserTierListService.name)
  
  constructor(
    @InjectModel('UserTierList')
    private readonly userTierListModel: Model<UserTierList>,
  ) {}

  /** 查找 all TierList */
  public async findAll(): Promise<UserTierListSimple[]> {
    return (await this.userTierListModel.find()).map((item) => formatUserTierList(item));
  }

  /** 查找TierList */
  public async findOne(id: string): Promise<UserTierListSimple> {
    return formatUserTierList(await this.userTierListModel.findOne({ id }));
  }

  /** 添加TierList */
  public async createOne(body: CreateUserTierListDTO): Promise<UserTierListSimple> {
    return formatUserTierList(
      await this.userTierListModel.create({
        ...body,
        id: uuidv4(),
        createdIp: body.ip,
        createdDate: new Date().getTime(),
        updatedIp: body.ip,
        updatedDate: new Date().getTime(),
      }),
    );
  }

  /** 编辑TierList */
  public async updateOne(id: string, body: EditUserTierListDTO): Promise<UserTierListSimple> {
    await this.userTierListModel.findOneAndUpdate(
      { id },
      {
        ...body,
        updatedIp: body.ip,
        updatedDate: new Date().getTime(),
      },
    );
    return { ...body, updatedDate: new Date().getTime() };
  }

  /** 删除TierList */
  public async deleteOne(id: string): Promise<void> {
    await this.userTierListModel.findOneAndDelete({ id });
  }

  /** 统计样本总`数  */
  public async countAll(): Promise<number> {
    return await this.userTierListModel.countDocuments({ });
  }

  public async averageAll(): Promise<AllTierListStatistics>{
    let allTierList: Tier[][] = [];
    (await this.userTierListModel.find()).map((item) => allTierList.push(item.tierList));
    
    let avgTier : CharStatistics = {};
    let validCount : number = 0;

    allTierList.forEach((tierList: Tier[]) => {
      if(tierList.length < 3){ //评级少于3个，不计入统计
        return;
      }

      validCount += 1;

      let values :Array<number> = []; //一个用户的所有评级 
      tierList.forEach((tier:Tier)=>{
        values.push(tier.value);
      });
      

      // this.logger.debug( "Before mapping ", values);
      
      values = intervalMapping(values, 0, 5); //[min, max] 映射到[0,5]
      // this.logger.debug( "After mapping: ", values);
      values = values.map(item => 5-item) //reverse，越接近5评分越高
      // this.logger.debug( "Finally: ", values);
      tierList.forEach((tier, i) =>{
        tier.value = values[i];
      }); //value写回到tier中

      tierList.forEach((tier: Tier)=>{
        /* tier example:
        {
          "value": 0,
          "characterKeys": [
            "char_263_skadi"
          ]
        }
        */
        tier.characterKeys.forEach((optId) => {
          if((optId in avgTier) == false){
            avgTier[optId] = {
              avgValue: 0,
              count: 0,
            };
          };
          avgTier[optId].count += 1; 

          /*计算平均值：AVG = (N-1)/N * PREV_AVG + cur / N*/
          const prev_avg : number= avgTier[optId].avgValue;
          const N : number= avgTier[optId].count;
          const new_avg = ((N - 1) / N ) * prev_avg + tier.value / N;
          avgTier[optId].avgValue = new_avg;
          // this.logger.debug("avgTier[optId].count = " + avgTier.get(optId).count + "avgTier[optId].avgValue = " + avgTier.get(optId).avgValue)
        });
      });
    });

    // for (const [key, value] of Object.entries(avgTier)) {
    //   this.logger.debug(`干员${key}: 均分${value.avgValue}, 评价次数${value.count}`);
    // }

    return {
      count: allTierList.length,
      validCount: validCount,
      charStatistics: avgTier,
    };
    

  }
}
