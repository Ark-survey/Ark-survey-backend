import { Controller, Logger, Body, Post, HttpCode } from '@nestjs/common';
import {  CreateTierListRequestDTO, DeleteTierListRequestDTO, GetAllByUserIdRequestDTO, GetByIdRequestDTO, TierListDTO, UpdateTierListRequestDTO,  } from './tier-list.dto';
import { TierListService} from './tier-list.service';
import { RealIP } from 'nestjs-real-ip';




@Controller('tierList')
export class TierListController {

    private readonly logger = new Logger(TierListController.name)
    constructor(private readonly tierListService: TierListService) {}

    @Post('getAllbyUserId')
    @HttpCode(200)
    public async getAllbyUserId(
      @Body() 
      request : GetAllByUserIdRequestDTO,
    ): Promise<NormalResponse<TierListDTO[]>> { //TODO ? User除了自己定义的，还从Document获得了什么？
      const res = await this.tierListService.getAllbyTierListId(request.userId);
    //   return res.length == 0
    //     ? {
    //         code: 400,
    //         message: `No eligible TierList with userId  = ${request.userId}`,
    //       }:
    //         {
    //         code: 200,
    //         data: res,
    //         message: 'success',
    //       };
        return {
            code: 200,
            data: res,
            message: 'success',
        }
    }

    @Post('createOne')
    // @HttpCode(200)
    public async createOne(
      @Body()
      request: CreateTierListRequestDTO,
    ): Promise<NormalResponse<TierListDTO>> {
        //TODO 是否需要检查是否存在该User？
      return {
        code: 200,
        data: await this.tierListService.createOne(request),
        message: 'success',
      };
    }
    
    @Post('deleteOne') //其实应该叫deleteById
    public async deleteOne(
      @Body()
      request: DeleteTierListRequestDTO
    ): Promise<NormalResponse> {
      const res = await this.tierListService.deleteOne(request.id);
      return res ? {
        code: 200,
        message: 'Success.',
      }:{
        code: 400,
        message: `cannot find tierList with id ${request.id}`,
      }
    }

    //如果id
    @Post('updateOne')
    @HttpCode(200)
    public async updateOne(
        @Body()
        request: UpdateTierListRequestDTO,
    ): Promise<NormalResponse<TierListDTO>> {
        const res = await this.tierListService.updateOne(request)
        return res;
    }

    @Post('findAll')
    @HttpCode(200)
    public async findAll(): Promise<NormalResponse<TierListDTO[]>> {
      return {
        code: 200,
        data: await this.tierListService.findAll(),
        message: 'success',
      };
    }

   
}
