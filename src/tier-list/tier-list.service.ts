import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateTierListRequestDTO,
  formatTierListDTO,
  getOneRequestDTO,
  TierListDTO,
  UpdateTierListRequestDTO,
} from './tier-list.dto';
import { TierList } from './tier-list.interface';

@Injectable()
export class TierListService {
  private readonly logger = new Logger(TierListService.name);
  constructor(
    @InjectModel('TierList')
    private readonly tierListModel: Model<TierList>,
  ) {}

  public async getOne(dto: getOneRequestDTO): Promise<TierListDTO> {
    //{id} 会被转型为Schema定义的类型，然后做查询
    const userTierLists = (
      (await this.tierListModel.find({ userId: dto.userId, key: dto.key }).lean()) as TierList[]
    ).map((item) => formatTierListDTO(item));
    return userTierLists[0];
  }

  public async createOne(dto: CreateTierListRequestDTO): Promise<TierListDTO> {
    // this.logger.debug(dto.tierList.tiers[0].name.length)
    return formatTierListDTO(
      await this.tierListModel.create({
        ...dto.tierList,
        id: uuidv4(),
        createdDate: new Date().getTime(),
        updatedDate: new Date().getTime(),
      }),
    );
  }

  /** 删除TierList */
  public async deleteOne(id: string): Promise<boolean> {
    const res = await this.tierListModel.findOneAndDelete({ id });
    return res != null;
  }

  public async updateOne(dto: UpdateTierListRequestDTO): Promise<NormalResponse<TierListDTO>> {
    const tierList = await this.tierListModel.findOne({ id: dto.tierList.id });
    if (tierList == null) {
      return {
        code: 400,
        message: `cannot find tierList with id = ${dto.tierList.id}`,
      };
    }
    if (tierList.userId != dto.tierList.userId) {
      return {
        code: 400,
        message: `user ${dto.tierList.userId} doesn't have rights to access user ${tierList.userId}'s tierList(id = ${tierList.id})`,
      };
    }
    const res = await this.tierListModel.findOneAndUpdate(
      { id: dto.tierList.id },
      {
        // useId: dto.tierList.userId,
        name: dto.tierList.name,
        key: dto.tierList.key,
        value: dto.tierList.value,
        tiers: dto.tierList.tiers,
        updatedDate: new Date().getTime(),
      },
      { new: true }, //返回update后的document
    );

    return {
      code: 200,
      data: formatTierListDTO(res),
      message: 'success',
    };
  }

  public async findAll(): Promise<TierListDTO[]> {
    //lean() 加速查询
    return ((await this.tierListModel.find().lean()) as TierList[]).map((item) => formatTierListDTO(item));
  }

  // public async
}
