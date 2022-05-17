// user-tier-list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { CreateUserTierListDTO, EditUserTierListDTO } from './user-tier-list.dto';
import { UserTierList, UserTierListSimple } from './user-tier-list.interface';
import { formatUserTierList } from 'utils';

@Injectable()
export class UserTierListService {
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

  /** 统计样本总数  */
  async countAll(): Promise<number> {
    return await this.userTierListModel.countDocuments({});
  }
}
