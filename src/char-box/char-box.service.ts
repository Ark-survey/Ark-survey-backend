import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CharBoxResponseDTO,  formatCharBoxDTO, CreateCharBoxDTO, UpdateCharBoxDTO } from './char-box.dto';
import { CharBox, } from './char-box.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CharBoxService {
    private readonly logger = new Logger(CharBoxService.name);
    constructor(
        @InjectModel('CharBox')
        private readonly charBoxModel: Model<CharBox>,
    ){}

    async getCharBoxByUserId(userId: string): Promise<CharBoxResponseDTO>{
        const charBox = await this.charBoxModel.findOne({userId});
        return charBox == null? null:formatCharBoxDTO(charBox);
    }

    async createOne(dto: CreateCharBoxDTO): Promise<CharBoxResponseDTO>{
        return formatCharBoxDTO(await this.charBoxModel.create({
            ...dto,
            id: uuidv4(),
            updatedDate: new Date().getTime(),
          }));
    }

    async updateOne(dto: UpdateCharBoxDTO): Promise<CharBoxResponseDTO>{        
        return formatCharBoxDTO(await this.charBoxModel.findOneAndUpdate(
            { id: dto.id },
            {
            characterKeys: dto.characterKeys,
            updatedDate: new Date().getTime(),
          }));
    }

    async deleteById(id:string, userId:string): Promise<CharBoxResponseDTO>{        
        return formatCharBoxDTO(await this.charBoxModel.findOneAndDelete(
            { id }));
    }



    /***
     * 
     */
    async isUserCharBoxExists(userId: string): Promise<boolean>{
        // const userCharBox = await this.getCharBoxByUserId(userId);
        //https://mongoosejs.com/docs/api.html#model_Model.exists
        const isExist = await this.charBoxModel.exists({userId});
        return isExist == null? false: true;

    }

    /**
     * 调用前需确保userId在db中有对应的charBox
     * @param userId : userId
     * @param charBoxId : charBoxid
     * @returns userId对应的CharBoxId是否和charBoxId一致
     */
    async isUserCharBoxIdMatch(userId: string, charBoxId: string): Promise<boolean>{
        const userCharBox = await this.getCharBoxByUserId(userId);
        return userCharBox.id == charBoxId;

    }

    /**
     * 上面两个函数的结合；方便调用，且只访问一次数据库
     * @param userId 
     * @param charBoxId 
     * @returns 
     */
    async isExistAndMatcch(userId: string, charBoxId: string): Promise<boolean>{
        const userCharBox = await this.getCharBoxByUserId(userId);
        if(userCharBox == null) return false;
        if(userCharBox.id != charBoxId) return false;
        return true;
    }
}

