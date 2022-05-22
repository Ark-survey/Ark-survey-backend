import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateTierListRequestDTO, formatTierListDTO, GetAllByUserIdRequestDTO, TierListDTO, UpdateTierListRequestDTO } from './tier-list.dto';
import { TierList } from './tier-list.interface';

@Injectable()
export class TierListService {
    private readonly logger = new Logger(TierListService.name);
    constructor(
        @InjectModel('TierList')
        private readonly tierListModel: Model<TierList>,
      ) {}

    public async getAllbyTierListId(userId: string): Promise<TierListDTO[]>{
        this.logger.debug(userId)
        //{id} 会被转型为Schema定义的类型，然后做查询
        const res = 
            await this.tierListModel.find({userId}).lean() as TierList[];//ES6 shorthand 对象定义 

        return res == null? null : res.map((item) => formatTierListDTO(item));
    }



    public async createOne(dto : CreateTierListRequestDTO): Promise<TierListDTO> {
        return formatTierListDTO(await this.tierListModel.create({
            ...dto.tierList,
            id: uuidv4(),
            createdDate: new Date().getTime(),
            updatedDate: new Date().getTime(),
          }));
    }

    
    /** 删除TierList */
    public async deleteOne(id: string): Promise<boolean> {
        const res = await this.tierListModel.findOneAndDelete({ id });
        return res != null;
    }



        
    public async updateOne(dto : UpdateTierListRequestDTO): Promise<NormalResponse<TierListDTO>> {
        const tierList = await this.tierListModel.findOne({id: dto.tierList.id});
        if(tierList == null){
            return {
                code: 400,
                message: `cannot find tierList with id = ${dto.tierList.id}`
            }
        }
        if(tierList.userId != dto.userId){
            return {
                code: 400,
                message: `user ${dto.userId} doesn't have rights to access user ${tierList.userId}'s tierList(id = ${tierList.id})`
            }
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
            {new: true}, //返回update后的document
            );
        //   this.logger.debug(res)

        return {
            code: 200,
            data: formatTierListDTO(res),
            message: 'success',
        };
    }
    

    public async findAll(): Promise<TierListDTO[]> {
        //lean() 加速查询
          return (await this.tierListModel.find().lean() as TierList[]).map((item) => formatTierListDTO(item));
    }
}
