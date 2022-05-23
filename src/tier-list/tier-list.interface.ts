

export interface Tier {
    name: string;
    value: number;
    characterKeys: string[];
  }

//务必与schema保持一致
export interface TierList extends Document{
    readonly id: string; //TierList id
    readonly userId: string; //User id
    readonly name: string; //// List 名称
    readonly key: string, //?
    readonly value: number; //?
    readonly tiers: Tier[]; //等级表
    readonly createdDate: string; //
    readonly updatedDate: string, //
}