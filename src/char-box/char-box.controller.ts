import { Body, Controller, Inject, Post } from '@nestjs/common';
import {  CharBoxResponseDTO, CreateCharBoxDTO, GetCharBoxByUserIdDTO } from './char-box.dto';
import { CharBox } from './char-box.interface';
import { CharBoxService } from './char-box.service';

@Controller('charBox')
export class CharBoxController {
    constructor(
        private readonly charBoxService:  CharBoxService,
        ){}
    
    @Post('getCharBoxByUserId')
    async getCharBoxByUserId(
        @Body()
        req: GetCharBoxByUserIdDTO
    ):Promise<NormalResponse<CharBoxResponseDTO>>{
        const res = await this.charBoxService.getCharBoxByUserId(req.userId);
        return res == null
        ? {
          code: 400,
          message: `No eligible CharBox with userId = ${req.userId}`,
        }:
          {
          code: 200,
          data: res,
          message: 'success',
        };
    }

    @Post('createOne')
    // @HttpCode(200)
    public async createOne(
      @Body()
      request: CreateCharBoxDTO,
    ): Promise<NormalResponse<CharBoxResponseDTO>> {
        //TODO 是否需要检查是否存在该User？
    //   const user = await this.charBoxServicegetById(request.userId);
    //   if(user == null) return{
    //       code: 400,
    //       message: `cannot find user with Userid = ${request.userId}`,
    //   }
      return {
        code: 200,
        data: await this.charBoxService.createOne(request.charBox),
        message: 'success',
      };
    }
    
}
