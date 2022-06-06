import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {  CharBoxResponseDTO,  CreateOneRequestDTO, DeleteOneRequestDTO, GetCharBoxByUserIdDTO, UpdateOneRequestDTO } from './char-box.dto';
import { CharBox } from './char-box.interface';
import { CharBoxService } from './char-box.service';

@Controller('charBox')
export class CharBoxController {
    private readonly logger = new Logger(CharBoxController.name);
    constructor(
        private readonly charBoxService:  CharBoxService,
        private readonly userService: UserService,
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
      request: CreateOneRequestDTO,
    ): Promise<NormalResponse<CharBoxResponseDTO>> {
      //check1 是否存在该User？
      const user = await this.userService.getById(request.charBox.userId);
      if(user == null) return{
          code: 400,
          message: `cannot find user with Userid = ${request.charBox.userId}`,
      }

      //check 2 该user是否已有checkbox
      if(true == (await this.charBoxService.isUserCharBoxExists(request.charBox.userId))){
        return{
          code: 400,
          message: `userId ${request.charBox.userId}'s CharBox already exists, please use updateOne instead.`
        }
      }

      //create
      return {
        code: 200,
        data: await this.charBoxService.createOne(request.charBox),
        message: 'success',
      };
    }

    @Post('updateOne')
    // @HttpCode(200)
    public async updateOne(
      @Body()
      request: UpdateOneRequestDTO,
    ): Promise<NormalResponse<CharBoxResponseDTO>> {
      // //check 1 userId对应的CharBox是否存在
      // if(false == (await this.charBoxService.isUserCharBoxExists(request.charBox.userId))){
      //   return{
      //     code: 400,
      //     message: `userId ${request.charBox.userId}'s CharBox not found, please use createOne instead.`
      //   }
      // }

      // //check 2 userId对应的CharBox的id 和 request中的id是否匹配
      // if(false == (
      //   await this.charBoxService.isUserCharBoxIdMatch(
      //     request.charBox.userId, request.charBox.id)
      // )) 
      //   return{
      //   code: 400,
      //   //是否返回详细报错
      //   message: `id ${request.charBox.id} and user's CharBox id don't match`
      // }

      if(false == (await this.charBoxService.isExistAndMatch(request.charBox.userId, request.charBox.id))){
        return {
          code: 400,
          message: `ERROR: userId ${request.charBox.userId}'s CharBox not found or id ${request.charBox.id} don't match.`
        }
      }

      return {
        code: 200,
        data: await this.charBoxService.updateOne(request.charBox),
        message: 'success',
      };
    }
    
    @Post('deleteById')
    public async deleteById(
      @Body()
      request: DeleteOneRequestDTO,
    ): Promise<NormalResponse<CharBoxResponseDTO>>{

      if(false == (await this.charBoxService.isExistAndMatch(request.userId, request.id))){
        return {
          code: 400,
          message: `userId ${request.userId}'s CharBox not found or id ${request.id} don't match.`
        }
      }

      return {
        code: 200,
        data: await this.charBoxService.deleteById(request.id, request.userId),
        message: 'success',
      };
    }
}