import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CharSkinBoxResponseDTO, CreateOneRequestDTO, DeleteOneRequestDTO, GetCharSkinBoxByUserIdDTO, UpdateOneRequestDTO } from './char-skin-box.dto';
import { CharSkinBoxService } from './char-skin-box.service';

@Controller('charSkinBox')
export class CharSkinBoxController {
    private readonly logger = new Logger(CharSkinBoxController.name);
    constructor(
        private readonly charSkinBoxService:  CharSkinBoxService,
        private readonly userService: UserService,
        ){}
    

    @Post('getCharSkinBoxByUserId')
    async getCharSkinBoxByUserId(
        @Body()
        req: GetCharSkinBoxByUserIdDTO
    ):Promise<NormalResponse<CharSkinBoxResponseDTO>>{
        const res = await this.charSkinBoxService.getCharSkinBoxByUserId(req.userId);
        return res == null
        ? {
          code: 400,
          message: `No eligible CharSkinBox with userId = ${req.userId}`,
        }:
          {
          code: 200,
          data: res,
          message: 'success',
        };
    }

    /**
     * user未创建过charSkinbox且在user表中存在
     */
    @Post('createOne')
    // @HttpCode(200)
    public async createOne(
      @Body()
      request: CreateOneRequestDTO,
    ): Promise<NormalResponse<CharSkinBoxResponseDTO>> {
      //check1 是否存在该User？
      const user = await this.userService.getById(request.charSkinBox.userId);
      if(user == null) return{
          code: 400,
          message: `cannot find user with Userid = ${request.charSkinBox.userId}`,
      }

      //check 2 该user是否已有checkSkinbox
      if(true == (await this.charSkinBoxService.isUserCharSkinBoxExists(request.charSkinBox.userId))){
        return{
          code: 400,
          message: `userId ${request.charSkinBox.userId}'s CharSkinBox already exists, please use updateOne instead.`
        }
      }
      const res = await this.charSkinBoxService.createOne(request.charSkinBox);
      return {
        code: 200,
        data: res,
        message: 'success',
      };
    }

    /**
     * User的charSkinbox存在且id匹配
     */
    @Post('updateOne')
    // @HttpCode(200)
    public async updateOne(
      @Body()
      request: UpdateOneRequestDTO,
    ): Promise<NormalResponse<CharSkinBoxResponseDTO>> {

      if(false == (await this.charSkinBoxService.isExistAndMatch(request.charSkinBox.userId, request.charSkinBox.id))){
        return {
          code: 400,
          message: `ERROR: userId ${request.charSkinBox.userId}'s CharSkinBox not found or charSkinBox id ${request.charSkinBox.id} don't match.`
        }
      }

      return {
        code: 200,
        data: await this.charSkinBoxService.updateOne(request.charSkinBox),
        message: 'success',
      };
    }
    
    /**
     * User的charSkinbox存在且id匹配
     */
    @Post('deleteById')
    public async deleteById(
      @Body()
      request: DeleteOneRequestDTO,
    ): Promise<NormalResponse<CharSkinBoxResponseDTO>>{

      if(false == (await this.charSkinBoxService.isExistAndMatch(request.userId, request.id))){
        return {
          code: 400,
          message: `userId ${request.userId}'s CharSkinBox not found or id ${request.id} don't match.`
        }
      }

      return null == await this.charSkinBoxService.deleteById(request.userId, request.id)?{
        code: 400,
        message: 'Delete Failed',
      }:{
        code: 200,
        message: 'success',
      };
    }
}
