import { Controller, Logger, Body, Post, HttpCode } from '@nestjs/common';
import {  CreateTierListRequestDTO, DeleteTierListRequestDTO, GetAllByUserIdRequestDTO, GetByIdRequestDTO, TierListDTO, UpdateTierListRequestDTO,  } from './tier-list.dto';
import { TierListService} from './tier-list.service';
import { RealIP } from 'nestjs-real-ip';
import { UserService } from 'src/user/user.service';




@Controller('tierList')
export class TierListController {

    private readonly logger = new Logger(TierListController.name)
    constructor(
      private readonly tierListService: TierListService,
      private readonly userService: UserService,
      ) {}

    @Post('getAllbyUserId')
    @HttpCode(200)
    public async getAllbyUserId(
      @Body() 
      request : GetAllByUserIdRequestDTO,
    ): Promise<NormalResponse<TierListDTO[]>> { 
      const res = await this.tierListService.getAllbyUserId(request.userId);
        return {
            code: 200,
            data: res, //无对应，返回空数组
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
      const user = await this.userService.getById(request.userId);
      if(user == null) return{
          code: 400,
          message: `cannot find user with Userid = ${request.userId}`,
      }
      return {
        code: 200,
        data: await this.tierListService.createOne(request),
        message: 'success',
      };
    }
    
    @Post('deleteById') //其实应该叫deleteById
    public async deleteById(
      @Body()
      request: DeleteTierListRequestDTO
    ): Promise<NormalResponse> {
      const res = await this.tierListService.deleteById(request.id);
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
