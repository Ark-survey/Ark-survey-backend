import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { Tier, TierListType, UserTierListSimple } from './user-tier-list.interface';
import { UserTierListService } from './user-tier-list.service';
//stat
import { AllTierListStatistics } from './user-tier-list.interface';

interface UserTierListResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('userTierList')
export class UserTierListController {
  constructor(private readonly userTierListService: UserTierListService) {}

  @Post('findAll')
  @HttpCode(200)
  public async findAll(): Promise<UserTierListResponse<UserTierListSimple[]>> {
    return {
      code: 200,
      data: await this.userTierListService.findAll(),
      message: 'success',
    };
  }

  @Post('findById')
  @HttpCode(200)
  public async findOne(
    @Body()
    body: {
      readonly id: string;
    },
  ): Promise<UserTierListResponse<UserTierListSimple>> {
    const res = await this.userTierListService.findOne(body.id);
    return res.id
      ? {
          code: 200,
          data: res,
          message: 'success',
        }
      : {
          code: 400,
          message: 'No eligible data',
        };
  }

  @Post('createOne')
  public async createOne(
    @Body()
    body: {
      readonly name: string;
      readonly password: string;
      readonly type: TierListType;
      readonly tierList: Tier[];
    },
    @RealIP() ip: string,
  ): Promise<UserTierListResponse> {
    return {
      code: 200,
      data: await this.userTierListService.createOne({ ...body, ip }),
      message: 'success',
    };
  }

  @Post('updateOne')
  public async updateOne(
    @Body()
    body: {
      readonly id: string;
      readonly name: string;
      readonly password: string;
      readonly type: TierListType;
      readonly tierList: Tier[];
    },
    @RealIP() ip: string,
  ): Promise<UserTierListResponse> {
    return {
      code: 200,
      data: await this.userTierListService.updateOne(body.id, { ...body, ip }),
      message: 'Success.',
    };
  }

  @Post('deleteById')
  public async deleteOne(
    @Body()
    body: {
      readonly id: string;
    },
  ): Promise<UserTierListResponse> {
    await this.userTierListService.deleteOne(body.id);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  @Post('countAll')
  @HttpCode(200)
  async countAll(): Promise<UserTierListResponse<number>>{
    return {
      code: 200,
      data: await this.userTierListService.countAll(),
      message: 'Success.',
    }
  }

  @Post('averageAll')
  @HttpCode(200)
  async averageAll(): Promise<UserTierListResponse<AllTierListStatistics>>{
    return {
      code: 200,
      data: await this.userTierListService.averageAll(),
      message: 'Success.',
    };
  }
}

export class UserTierListTierListController {}
