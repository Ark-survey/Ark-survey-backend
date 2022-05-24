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
        // this.logger.debug(id)
        //{id} 会被转型为Schema定义的类型，然后做查询
        const res = 
            await this.userModel.findOne({id})//ES6 shorthand 对象定义 

        return res == null? null : formatUserDTO(res);
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

    public async updateOne(dto : UpdateUserRequestDTO, ip: string): Promise<UserDTO> {
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
      //lean() 加速查询
        return (await this.userModel.find().lean()).map((item) => formatUserDTO(item));
      }
}
