import { Controller, Logger, Body, Post, HttpCode } from '@nestjs/common';
import { CreateUserRequestDTO, UpdateUserRequestDTO, GetByIdRequestDTO, UserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { RealIP } from 'nestjs-real-ip';




@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name)
    constructor(private readonly userService: UserService) {}

    @Post('getById')
    @HttpCode(200)
    public async findOne(
      @Body() //从requst body中提取数字，并填入变量body中
      request : GetByIdRequestDTO,
    ): Promise<NormalResponse<UserDTO>> { //TODO ? User除了自己定义的，还从Document获得了什么？
      this.logger.debug(request)
      const res = await this.userService.getById(request.id);
      return res.id
        ? {
            code: 200,
            data: res,
            message: 'success',
          }
        : {
            code: 400,
            message: `No eligible User with id = ${request.id}`,
          };
    }

    @Post('createOne')
    @HttpCode(200)
    public async createOne(
      @Body()
      request: CreateUserRequestDTO,
      @RealIP() ip: string,
    ): Promise<NormalResponse<UserDTO>> {
      return {
        code: 200,
        data: await this.userService.createOne(request, ip),
        message: 'success',
      };
    }

    //如果id
    @Post('updateOne')
    @HttpCode(200)
    public async updateOne(
      @Body()
      request: UpdateUserRequestDTO,
      @RealIP() ip: string,
    ): Promise<NormalResponse<UserDTO>> {
      const userDTO = await this.userService.updateOne(request, ip)
      return userDTO == null?
      {
        code: 400,
        message: 'cannot find user',
      }:{
        code: 200,
        data: userDTO,
        message: 'success',
      };
    }

    @Post('findAll')
    @HttpCode(200)
    public async findAll(): Promise<NormalResponse<UserDTO[]>> {
      return {
        code: 200,
        data: await this.userService.findAll(),
        message: 'success',
      };
    }

}
