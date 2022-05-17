import { Document } from 'mongoose';

export interface Tier {
  value: number;
  name: string;
  characterKeys: string[];
}

// todo
export type TierListType = ['NORMAL', 'CC', 'ROUGE', 'CUSTOM'];

export interface UserTierList extends Document {
  readonly id: string; // List 唯一 ID
  readonly password: string; // 操作密码
  readonly name: string; // List 名称
  readonly type: TierListType; // List 分类
  readonly tierList: Tier[]; // TierList
  readonly createdIp: string;
  readonly createdDate: string;
  readonly updatedIp: string;
  readonly updatedDate: number;
}

export interface UserTierListSimple {
  readonly id: string; // List 唯一 ID
  readonly password?: string; // 操作密码
  readonly name: string; // List 名称
  readonly type: TierListType; // List 分类
  readonly tierList: Tier[]; // TierList
  readonly updatedDate: number;
}

/*Stat**/
//每个干员的统计数据
//可增加其他数据
export interface Statistic{
  avgValue : number //均分
  count: number //被评价的次数
  //其他数据
}


/* 
所有干员的统计信息
在所有tierList中都未出现的干员，不进行统计
e.g.
{
  '黑': {
    avgValue: 3.1;
    times: 2,
  },
  '水陈' : {
    avgValue: ...,
    times: 10,
  }
}
*/
export type CharStatistics = {
  [key:string] : Statistic
} 

//返回给前端的数据格式
export interface AllTierListStatistics{
  readonly count: number; //样本数量
  readonly validCount: number; //被纳入统计的样本数量
  charStatistics: CharStatistics //所有干员的统计数据
}

