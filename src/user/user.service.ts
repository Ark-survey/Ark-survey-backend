import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequestDTO, UpdateUserRequestDTO ,formatUserDTO, UserDTO } from './user.dto';
import { User } from './user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
      ) {}

    public async getById(id: string): Promise<UserDTO>{
        this.logger.debug(id)
        //{id} 会被转型为Schema定义的类型，然后做查询
        return formatUserDTO(
            await this.userModel.findOne({id})//ES6 shorthand 对象定义 
            );
    }

    public async createOne(dto : CreateUserRequestDTO, ip: string): Promise<UserDTO> {
        return  formatUserDTO(await this.userModel.create({
            ...dto, //password
            id: uuidv4(),
            createdIp: ip,
            createdDate: new Date().getTime(),
            updatedIp: ip,
            updatedDate: new Date().getTime(),
          }));
    }

    //如果id对应的User不存在，则创建一个新的User，这河里吗
    public async updateOne(dto : UpdateUserRequestDTO, ip: string): Promise<UserDTO> {
        // const res = await this.userModel.updateOne(
        //     {id: dto.id },
        //     {   
        //     password: dto?.password , //id password
        //     updatedIp: ip,
        //     updatedDate: new Date().getTime(),
        //     });
        // // this.logger.debug(`modified cnt: ${res.modifiedCount}; acknowledged: ${res.acknowledged}; matched cnt: ${res.matchedCount}`)
        // this.logger.debug(res)
        // return ;
        // return  res;
        const res = await this.userModel.findOneAndUpdate(
            { id: dto.id },
            {
              password: dto?.password,
              updatedIp: ip,
              updatedDate: new Date().getTime(),
            },
            {new: true}, //返回update后的document
          );
        //   this.logger.debug(res)

        return res == null? null : formatUserDTO(res);
    }


    

    public async findAll(): Promise<UserDTO[]> {
        return (await this.userModel.find()).map((item) => formatUserDTO(item));;;
      }
}
