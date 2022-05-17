import { Document } from 'mongoose';

export interface Tier {
  value: number;
  name: string;
  optIds: string[];
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
